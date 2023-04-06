//this file is exported to hotel.js file of routes folder
import User from '../models/User.js'; //importing hotel model


// we do not need this createUser as we have the register funcion from authController.js file 
// fucntion to create user start
// export const createUser = async (req, res, next)=>{

//     const newUser = new User(req.body) //receiving data from user

//     try{
//         const savedUser = await newUser.save() //save() is a mongoose method, saving data on the mongodb database
//         res.status(200).json(savedUser) //sending json data about hotel we have created
//     }catch(err){
//         // res.status(500).json(err)
//         next(err)// the middleware to handle error in index.js file is executed
//     }
// }
// fucntion to create user end


// fucntion to update hotel start
export const updateUser = async (req, res, next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}) //updating data in the database, {new: true} is used so that it return the updated record
        res.status(200).json(updateUser) //sending json data about hotel we have updated
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to update hotel end

// fucntion to delete hotel start
export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id) //deleting data from the databse bsed on the id
        res.status(200).json(`Object with id:${req.params.id} is deleted`) //sending json data about hotel we have updated
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to delete hotel end


// fucntion to get specific hotel start
export const getUser = async (req, res, next)=>{
    try{
        const users = await User.findById(req.params.id) //using findById method to get record with paritcular id
        res.status(200).json({
            UserCount: users.length,
            users: users
        }) //sending json data of all hotels we have 
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to get specific hotel end


// fucntion to get all hotels start
export const getallUsers = async (req, res, next)=>{
    // const failed = true
    // if (failed) return next(createError(401, "you are not authenticated!"))

    try{
        const users = await User.find() //using find method to get all data in the databse
        res.status(200).json({
            userCount: users.length,
            users: users
        }) //sending json data of all hotels we have 
    }catch(err){
        // res.status(500).json(err) //sending error from index.js file, using middleware
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to get all hotels end
    