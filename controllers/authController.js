// this file will be exported to authRoute.js file of routes folder

import bcrypt from 'bcrypt'//package to ecrypt password
import User from "../models/User.js"
import { createError } from '../utils/error.js';//custom error handler
import  jwt  from 'jsonwebtoken';


// function to register a new user start
export const register = async (req, res, next)=>{
    try{

        // encrypting password using bcrypt package start
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // encrypting password using bcrypt package end

        // taking input from the user 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()//saving the inputs from the user on the database

        // sending response
        res.status(201).json({
            createdUser: newUser
        })
    }
    catch(err){
        next(err)
    }
}
// function to register a new user end

// function to login user start
export const login = async (req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})//checking if user exist
        if(!user) return next(createError(404, 'User not found!'))//calling custom function to handle error

        // using bcrypt package to compare password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, 'Wrong password or username!'))//calling custom function to handle error
   
        //creating jwt token if password is correct 
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)//we are going to send this token for each request to verify our identity

        // destrucing the user object so that we can prevent sending crucial data like password and isAdmin status
        const {password, isAdmin, ...otherDetails} = user._doc //use details is stored under _doc

        // setting jwt token into our cookies
        // {httpOnly: true} => this doesnt allow client secret to reach  cookie, making it secure
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({...otherDetails})

        res.status(200).json({
            succesful: 'true',
            message: `user with name: ${user.username} is logged in`,
            theUser: {...otherDetails}
        })
    }
    catch(err){
        next(err)
    }
}
// function to login user end