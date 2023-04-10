// this file is exported to index.js file

import express from "express";
import { createError } from "../utils/error.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getallHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create start
router.post("/", verifyAdmin, createHotel);
// create end

// update start
router.patch("/:id", verifyAdmin, updateHotel);
// update end

// delete start
router.delete("/:id", verifyAdmin, deleteHotel);
// delete end

// get start
router.get("/find/:id", getHotel);
// get end

// get all start
router.get("/", getallHotel);
// get all end

// get hotel count by city start
router.get("/countByCity", countByCity);
// get hotel count by city end

// get hotel count by type start
router.get("/countByType", countByType);
// get hotel count by type end

// get hotel room after bookin start
router.get("/room/:id", getHotelRooms);
// get hotel room after bookin end

export default router;
