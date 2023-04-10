import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// creating new room start
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId; //here we must receive existing hotel id from the params, because we are going to create rooms for that hotel
  const newRoom = new Room(req.body); //getting data for room from input

  try {
    const savedRoom = await newRoom.save(); //saving the data to the database, and assingning the data to a variable
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      }); //updating room id from Room model to the Hotel model
    } catch (err) {
      next(err); //execute the middleware to handle error in index.js file
    }
    res.status(200).json({
      successful: true,
      message: "New Room created",
      room: savedRoom,
    });
  } catch (err) {
    next(err); //execute the middleware to handle error in index.js file
  }
};
// creating new room end

// fucntion to update room start
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //updating data in the database, {new: true} is used so that it return the updated record
    res.status(200).json(updateRoom); //sending json data about hotel we have updated
  } catch (err) {
    // res.status(500).json(err)
    next(err); // the middleware to handle error in index.js file is executed
  }
};
// fucntion to update room end

// fucntion to delete Room start
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId; //here we must receive existing hotel id from the params, because we are going to delete rooms for that hotel
  try {
    await Room.findByIdAndDelete(req.params.id); //deleting data from the databse bsed on the id
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      }); //deleting room of a hotel, the id received from params must be an existing room id of a hotel
    } catch (err) {
      next(err); //execute the middleware to handle error in index.js file
    }
    res.status(200).json(`Room with id:${req.params.id} is deleted`); //sending json data about hotel we have updated
  } catch (err) {
    // res.status(500).json(err)
    next(err); // the middleware to handle error in index.js file is executed
  }
};
// fucntion to delete Room end

// fucntion to get specific room start
export const getRoom = async (req, res, next) => {
  try {
    const rooms = await Room.findById(req.params.id); //using findById method to get record with paritcular id
    res.status(200).json({
      roomCount: rooms.length,
      rooms: rooms,
    }); //sending json data of all hotels we have
  } catch (err) {
    // res.status(500).json(err)
    next(err); // the middleware to handle error in index.js file is executed
  }
};
// fucntion to get specific room end

// fucntion to get all rooms start
export const getallRoom = async (req, res, next) => {
  // const failed = true
  // if (failed) return next(createError(401, "you are not authenticated!"))

  try {
    const rooms = await Room.find(); //using find method to get all data in the databse
    res.status(200).json({
      roomCount: rooms.length,
      rooms: rooms,
    }); //sending json data of all hotels we have
  } catch (err) {
    // res.status(500).json(err) //sending error from index.js file, using middleware
    next(err); // the middleware to handle error in index.js file is executed
  }
};
// fucntion to get all rooms end

// fucntion to updateRoomAvailabiliy room start
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        // updating the room dates of availabiliy
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
// fucntion to updateRoomAvailabiliy room end
