import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to the db")
}).catch((err)=>{
    console.log(`db error : ${err}`)
})

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`)
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/auth",authRouter)