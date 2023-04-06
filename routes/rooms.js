
import express from 'express'
import { createRoom, deleteRoom, getRoom, getallRoom, updateRoom } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

// create start
router.post('/:hotelId', verifyAdmin, createRoom)
// create end

// update start
router.patch('/:id', verifyAdmin, updateRoom)
// update end

// delete start
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)
// delete end

// get start
router.get('/:id', getRoom)
// get end

// get all start
router.get('/', getallRoom)
// get all end

export default router