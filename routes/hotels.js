// this file is exported to index.js file

import express from 'express'
import { createError } from '../utils/error.js';
import { countByCity, createHotel, deleteHotel, getHotel, getallHotel, updateHotel } from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

// create start
router.post('/', verifyAdmin, createHotel)
// create end

// update start
router.patch('/:id', verifyAdmin, updateHotel)
// update end

// delete start
router.delete('/:id', verifyAdmin, deleteHotel)
// delete end

// get start
router.get('/find/:id', getHotel)
// get end

// get all start
router.get('/', getallHotel)
// get all end

// get hotel by city start
router.get('/countByCity', countByCity)
// get hotel by city end

// get hotel by type start
router.get('/countByType', getallHotel)
// get hotel by type end

export default router