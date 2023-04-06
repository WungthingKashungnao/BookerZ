// This file is exported to the authController.js file of controllers folder 

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},
{timestamps: true} //timestamp for created at and updated at
)

// creating model and exporting user model
// User is the name of the model and UserSchema is the schema we are using
export default mongoose.model('User', UserSchema) 
