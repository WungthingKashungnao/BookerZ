// This file is exported to the hotelController.js file of controllers folder 

import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    distance:{
        type: String,
        required: true
    },
    photos:{
        type: [String]
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String] // this room is going to store room ids
    },
    cheapestPrice:{
        type: Number,
        required: true
    },
    // on react app some hotels are going to be featured
    featured:{
        type: Boolean,
        default: false
    }
})

// creating model and exporting hotel model
// Hotel is the name of the model and HotelSchema is the schema we are using
export default mongoose.model('Hotel', HotelSchema) 
