// importing epxress
import express from "express";
import dotenv from 'dotenv' //for accesing env files
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors' ////for passing url from backend to frontend

import authRoute from './routes/authRoute.js'//importing authentication route file
import usersRoute from './routes/users.js'//importing users route file
import hotelsRoute from './routes/hotels.js'//importing hotels route file
import roomsRoute from './routes/rooms.js'//importing rooms route file

const app = express()//assigning express to app
dotenv.config()//congiguring the env file so we can access it 


//function for  connecting to the mongodb database 
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
      } catch (error) {
        // at initail connection, it will throw error if there is one, instead of trying to connect again and again
        throw error // this will throw error if their is a problem in connecting to mongoDB
    }
}

//this is optional: when we disconnect from mongoDB this code will run
mongoose.connection.on('disconnected', ()=>{
    console.log('mongoDB disconnected!')
})
//this is optional: when we connect to mongoDB this code will run
mongoose.connection.on('connected', ()=>{
    console.log('mongoDB connected!')
}) 

// middleware
app.use(cookieParser()) //used for jwt puposes which is being used in authController.js file of Conroller folder
app.use(express.json()) //very important we need this to send json data, for the routes
app.use(cors())//for passing url from backend to frontend
// if we got to '/api/auth' endpoint from home, the endpoints from authRoute will be executed
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

// middleware to handle error
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'something went wrong'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

// running the server 
app.listen(8800, ()=>{
    connect()//calling the function to connect to the mongodb database
    console.log('Server is running on port 8800')
})