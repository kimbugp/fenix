const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
require('./db/db')
const sU = require('./lib/generateSuperUser')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, async () => {
    await sU()
    console.log(`Server running on port ${port}`)
})