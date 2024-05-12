const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/TodoRoute')
const Cors = require('cors')
require('dotenv').config()

// App config
const app = express()

const PORT = process.env.PORT || 5000

//Convert to json
app.use(express.json())
app.use(Cors())
app.use(
	express.urlencoded({
		extended: true,
	})
)

//Mongodb Connection
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log(`Connected To MongoDB`))
	.catch(() => console.log(err))

//API end point
app.use(routes)

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
