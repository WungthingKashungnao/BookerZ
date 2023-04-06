// This file is exported to the rooomController.js file of controllers folder 

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers:[{number: Number, unavailableDates: {type: [Date]}} ]
},
{timestamps: true} //timestamp for created at and updated at
)

// creating model and exporting room model
// Room is the name of the model and RoomSchema is the schema we are using
export default mongoose.model('Room', RoomSchema) 
