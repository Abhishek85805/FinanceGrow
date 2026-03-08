import express, { Router } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js'

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

//middleware
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is running fine!"
    })
})

app.use("/auth", authRouter);

app.listen(port, () =>  {
    console.log(`Listening on port ${port}`);
})