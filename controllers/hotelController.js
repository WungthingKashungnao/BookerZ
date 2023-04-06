//this file is exported to hotel.js file of routes folder
import Hotel from '../models/Hotel.js'; //importing hotel model


// fucntion to createHotel start
export const createHotel = async (req, res, next)=>{

    const newHotel = new Hotel(req.body) //receiving data from user

    try{
        const savedHotel = await newHotel.save() //save() is a mongoose method, saving data on the mongodb database
        res.status(200).json(savedHotel) //sending json data about hotel we have created
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to createHotel end


// fucntion to update hotel start
export const updateHotel = async (req, res, next)=>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}) //updating data in the database, {new: true} is used so that it return the updated record
        res.status(200).json(updateHotel) //sending json data about hotel we have updated
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to update hotel end

// fucntion to delete hotel start
export const deleteHotel = async (req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id) //deleting data from the databse bsed on the id
        res.status(200).json(`Hotel with id:${req.params.id} is deleted`) //sending json data about hotel we have updated
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to delete hotel end


// fucntion to get specific hotel start
export const getHotel = async (req, res, next)=>{
    try{
        const hotels = await Hotel.findById(req.params.id) //using findById method to get record with paritcular id
        res.status(200).json({
            hotelCount: hotels.length,
            hotels: hotels
        }) //sending json data of all hotels we have 
    }catch(err){
        // res.status(500).json(err)
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to get specific hotel end


// fucntion to get all hotels start
export const getallHotel = async (req, res, next)=>{
    // const failed = true
    // if (failed) return next(createError(401, "you are not authenticated!"))

    try{
        const hotels = await Hotel.find() //using find method to get all data in the databse
        res.status(200).json({
            hotelCount: hotels.length,
            hotels: hotels
        }) //sending json data of all hotels we have 
    }catch(err){
        // res.status(500).json(err) //sending error from index.js file, using middleware
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to get all hotels end
    
// fucntion to get all hotels by city start
export const countByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(',') //taking in cities from user input

    try{
        const list = await Promise.all(cities.map(city=>{
            // return Hotel.find({city:city}).length //instead of this use mongoDB count document
            return Hotel.countDocuments({city:city}) //return the number hotels  in that city
         }))
         res.status(200).json(list)
        }catch(err){
        // res.status(500).json(err) //sending error from index.js file, using middleware
        next(err)// the middleware to handle error in index.js file is executed
    }
}
// fucntion to get all hotels by city end