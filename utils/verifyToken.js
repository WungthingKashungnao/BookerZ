//this file will be exported to the files of routes folder, fot the purpose of verification

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// verify token start
export const verifyToken = (req, res, next)=>{
    // taking token from cookies
    const token = req.cookies.access_token //assigning the token we have created in authcontroller.js underl login function

    // if there is no token that means we are not authenitcated
    if(!token){
        return next(createError(401, 'You are not authenticated!'))
    }

    // verifying if the token is correct or not
    // user argument value, here is the value we have created in authController.js file under login function, we have token variable defined, that is the value
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, 'Token is not valid!'))

        req.user = user //if everything is ok we pass our user information
        next() //now going to user file of routes folder and execute get method with checkauthentication route
    })
}
// verify token end

// verify user start
export const verifyUser = (req, res, next)=>{
    //before verifying user we need to first verify the token
    verifyToken(req, res, next, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()//go back to users.js file in route folder and execute the next function
        }else{
            // if(err) return next(createError(403, 'You are not authorized!'))
            next(createError(403, 'You are not authorized!'))
        }
    })
}
// verify use end

// verify isAdmin start
export const verifyAdmin = (req, res, next)=>{
    //before verifying user we need to first verify the token
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next()//go back to users.js file in route folder and execute the next function
        }else{
            // if(err) return next(createError(403, 'You are not authorized!'))
            next(createError(403, 'You are not authorized!'))
        }
    })
}
// verify isAdmin end