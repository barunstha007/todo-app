const { Router } = require('express')
const {
	getAllTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} = require('../controllers/todo.controller')

const router = Router()

//get todo list
router.get('/todos', getAllTodo)

//create a new todo
router.post('/todos', createTodo)

//update a todo
router.put('/todos/:id', updateTodo)

//delete a todo
router.delete('/todos/:id', deleteTodo)

module.exports = router
