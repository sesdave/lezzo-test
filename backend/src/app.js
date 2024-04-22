const express = require('express')
const http = require('http')
const appRoutes = require('./routes')
const initializeSocket = require('./util/socket')
const cors = require('cors')
const db = require('./models')

const app = express()
app.use(express.json())
app.use(cors())
const server = http.createServer(app)
app.use('/', appRoutes)

initializeSocket(server)

const PORT = process.env.PORT || 5000
const listener = ()=>server.listen(PORT, ()=>{
    console.log(`Server Started on port ${PORT}`)
})

db.init()
    .then(async()=>{
        console.log("Database Connected!!")
        listener()
    })
    .catch((err) => console.log("Something went wrong with the Database Update:", err));