import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to the db")
}).catch((err)=>{
    console.log(`db error : ${err}`)
})

const app = express()
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`)
})