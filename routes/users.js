// this file is exported to index.js file

//routes to create, update, delete users
import express from 'express'
import { deleteUser, getUser, getallUsers, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';



const router = express.Router();

// we do not need create as we have register from authRoute
// create start
// router.post('/', createUser)
// create end

// //  authentication token start
// router.get('/checkauthentication', verifyToken , (req, res, next)=>{
//     res.send('Hello user, you are logged in!')
// })
// // // authentication token start

// // verify user start
// router.get('/checkuser/:id', verifyUser , (req, res, next)=>{
//     res.send('Hello user, you are logged in! and you can delete you account')
// })
// // verify user end

// verify isAdmin start
router.get('/checkadmin/:id', verifyAdmin , (req, res, next)=>{
    res.send('Hello Admin, you are logged in! and you can delete anybodys account')
})
// verify isAdmin end

// update start
router.patch('/:id', verifyUser, updateUser)
// update end

// delete start
router.delete('/:id', verifyUser, deleteUser)
// delete end

// get start
router.get('/:id', verifyUser, getUser)
// get end

// get all start
router.get('/', verifyAdmin, getallUsers)
// get all end

export default router