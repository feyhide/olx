import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error(`Database connection error: ${err}`);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

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
