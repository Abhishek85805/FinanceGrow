import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () =>  {
    console.log(`Listening on port ${port}`);
})