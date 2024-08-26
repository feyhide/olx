import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/products.route.js';
import orderRouter from './routes/order.route.js'
import cookieParser from 'cookie-parser';
import { Redis } from 'ioredis'

dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})


redis.on("connect",()=>{
    console.log("redis connected")
})


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error(`Database connection error: ${err}`);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products",productRouter)
app.use("/api/v1/order",orderRouter)


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
