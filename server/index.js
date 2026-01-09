import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/Db.js';
import http from 'http';
import errorHandler from './src/middleware/errorHandler.js';
import authRouter from './src/routes/authRoutes.js';
import surveyRouter from './src/routes/surveyRoutes.js';
import { Server } from 'socket.io';
import initSocket from './src/config/socket.js';
import responseRouter from './src/routes/responseRoutes.js';

connectDB();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 7000;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});


app.use((req, res, next) => {
  req.io = io;
  next();
});

initSocket(io);


app.use('/api/auth', authRouter);
app.use('/api/surveys', surveyRouter);
app.use("/api/responses", responseRouter);


app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});