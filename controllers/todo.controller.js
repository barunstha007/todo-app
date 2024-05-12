const mongoose = require('mongoose')
const Todos = require('../models/Todo')

//Get Todo List
const getAllTodo = async (req, res) => {
	const { filter } = req.query
	try {
		let todos

		if (filter === 'done') {
			todos = await Todos.find({ completed: true })
		} else if (filter === 'upcoming') {
			const currentDate = new Date()
			todos = await Todos.find({
				date_time: { $gte: currentDate.toISOString() },
				completed: false,
			}).sort({ date_time: 1 })
		} else {
			todos = await Todos.find().sort({ date_time: -1 })
		}
		res.status(200).json({
			message: 'All the todos retreived successfully.',
			data: todos,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
}

const createTodo = async (req, res) => {
	const todoData = req.body
	const { name, description, date_time, completed } = req.body
	try {
		if (!name || !description || !date_time) {
			return res
				.status(400)
				.json({ error: 'Name,Description and Date time are required' })
		}
		const newTodo = await Todos.create(todoData)
		res
			.status(201)
			.json({ message: 'Todo Creatated Successfully.', data: newTodo })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error })
	}
}

const updateTodo = async (req, res) => {
	const { id } = req.params
	const { name, description, date_time, completed } = req.body
	try {
		// Check if the id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ message: `Invalid todo ID : ${id}` })
		}
		const todoId = { _id: id }
		const updateTodo = await Todos.findOneAndUpdate(todoId, {
			name,
			description,
			date_time,
			completed,
		})

		if (!updateTodo) {
			return res
				.status(404)
				.json({ message: `There is no todo with the id of ${id}` })
		}
		res.status(200).json({
			message: `Todo with the id:${id} updated successfully.`,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
}

const deleteTodo = async (req, res) => {
	const { id } = req.params
	try {
		// Check if the id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send(`There is no todo with the id of ${id}`)
		}

		const deleteTodo = await Todos.findOneAndDelete({ _id: id })
		if (!deleteTodo) {
			return res.status(404).json({ message: `Invalid todo ID : ${id}` })
		}
		res.status(200).json({
			message: `Todo with the id:${id} has been deleted`,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	getAllTodo,
	createTodo,
	updateTodo,
	deleteTodo,
}
