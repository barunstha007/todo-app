const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/TodoRoute')

require( 'dotenv' ).config()

const app = express()
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)
const PORT = process.env.PORT || 5000

//Mongodb Connection
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log(`Connected To MongoDB`))
	.catch(() => console.log(err))

app.use(routes)

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
