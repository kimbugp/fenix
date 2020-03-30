const express = require('express')
const cors = require('cors');

const port = process.env.PORT||3000
const userRouter = require('./routers/user')
const scriptRouter = require('./routers/scripts')
require('./db/db')
const sU = require('./lib/generateSuperUser')

const app = express()
app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(userRouter)
app.use(scriptRouter)

app.listen(port, async () => {
    await sU()
    console.log(`Server running on port ${port}`)
})