import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`)
})