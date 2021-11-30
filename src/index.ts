
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';

import config from './config/config';
import routes from './routes/index';

const app = express()
const httpServer = createServer(app)

const corsConfig = {
    origin: true,
    credentials: true,
  };

// use
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsConfig));


// middleware
app.use((req,res,next) => {
    console.log(`METHOD: ${req.method} URL: ${req.url} IP: ${req.socket.remoteAddress}`)
    next()
})

// routes

app.use('/api', routes.userRoutes )
app.use('/api', routes.postRoutes)

// cors
app.use(( req,res,next ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next()
})

// error
app.use((req,res,next) => {
    res.status(404).json({ msg: 'Not Found' })
})

// SERVER UP
mongoose
    .connect(`${config.database.url}`, config.database.options)
    .then(() => console.log( `DATABASE CONNECTED` ))
    .catch((error) => console.log(error))

httpServer.listen(config.server.port, () => {
    console.log(`SERVER: ${config.server.host}:${config.server.port}`)
})
