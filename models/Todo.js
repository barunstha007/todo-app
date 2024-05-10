const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
	name: { type: String, required: true },

	description: { type: String, required: true },

	completed: { type: Boolean, required: true, default: false },

	date_time: { type: Date, required: true },
})

module.exports = Todo = mongoose.model('todo', todoSchema)
