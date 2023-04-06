// this file is exported to index.js file

// for authentication
import express from 'express'
import { login, register } from '../controllers/authController.js';



const router = express.Router();

//the path will be joined with middleware path and then the path '/' will be executed from the path of middleware and then this '/' route
// router.get('/', (req, res)=>{
//     res.send("Hello, this is authentication end point!")
// })

//the path '/register' will be joined with middleware path and then the path /register' will be executed from the path of middleware and then this '/register' route
router.post('/register', register)
router.post('/login', login)

export default router