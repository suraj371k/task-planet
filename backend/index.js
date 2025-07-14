import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import http from 'http'
import { Server } from 'socket.io'

//routes import
import userRoutes from './routes/user.routes.js'
import claimRoutes from './routes/claim.routes.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ["GET" , "POST"]
    }
});

const port = 4000;

app.use(express.json())
app.use(cors())

app.set('io' , io)

//routes
app.use('/api/users' , userRoutes)
app.use('/api/claim' , claimRoutes)


//db connection
connectDb()

//web socket events
io.on("connection" , (socket) => {
    console.log("client connected: " , socket.id);
    socket.on("disconnect" , () => {
        console.log("client disconnected: " , socket.id)
    })
})

server.listen(port , () => {
    console.log(`app is running on http://localhost:${port}`)
})

