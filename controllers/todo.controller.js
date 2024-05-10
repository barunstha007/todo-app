const mongoose = require('mongoose')
const Todos = require('../models/Todo')

//Get Todo List
const getAllTodo = async (req, res) => {
	try {
		const allTodos = await Todos.find().sort({ date_time: -1 })
		res.status(200).send(allTodos)
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message })
	}
}

const createTodo = async (req, res) => {
	const todoData = req.body
	try {
		const newTodo = await Todos.create(todoData)
		res.status(201).send(newTodo)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error })
	}
}

const updateTodo = async (req, res) => {
	const { id } = req.params
	console.log({ id })
	try {
		// Check if the id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send(`There is no todo with the id of ${id}`)
		}
		const todoId = { _id: id }
		const update = { completed: true }
		const updateTodo = await Todos.findOneAndUpdate(todoId, update)

		if (!updateTodo) {
			return res.status(404).send(`There is no todo with the id of ${id}`)
		}
		res.status(200).json({
			data: updateTodo,
			message: `Todo with the ${id} has been updated`,
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

		res.status(200).send(deleteTodo)
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
