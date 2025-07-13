import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'

//routes import
import userRoutes from './routes/user.routes.js'
import claimRoutes from './routes/claim.routes.js'

dotenv.config()
const app = express()

const port = 4000;

app.use(express.json())
app.use(cors())

//routes
app.use('/api/user' , userRoutes)
app.use('/api/claim' , claimRoutes)


//db connection
connectDb()

app.listen(port , () => {
    console.log(`app is running on http://localhost:${port}`)
})

