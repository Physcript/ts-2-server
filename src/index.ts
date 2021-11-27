
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';

import config from './config/config';
import routes from './routes/index';

const app = express()
const httpServer = createServer(app)

// use
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// middleware
app.use((req,res,next) => {
    console.log(`METHOD: ${req.method} URL: ${req.url} IP: ${req.socket.remoteAddress}`)
    next()
})

// routes

app.use('/api', routes.userRoutes )

// cors
app.use(( req,res,next ) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Token')
    res.setHeader('Access-Control-Allow-Credentials','true')
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
