// this files will exported where ever needed to handle custom error
//example this file is exported to hotel.js of routes folder

export const createError = (status, message)=>{
    const err = new Error(); //creating err object, which is an object of class Error() predfined javascript class
    err.status = status;
    err.message = message
    return err
}