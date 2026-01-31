import express from 'express'
const app=express()
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import notesRoutes from './routes/notes.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
    credentials:true
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Database connected"))
    .catch((err)=>{console.log("error while connecting to database",err)})

app.use('/auth',authRoutes)
app.use('/notes',notesRoutes)

app.listen(3000,()=>{
    console.log("Server 3000...")
})