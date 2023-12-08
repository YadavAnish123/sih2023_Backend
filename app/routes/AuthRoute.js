const express = require("express");
const User = require("../model/UserModel");
const { protect } = require("../middleware/auth");

const {
	registerUser,
	login,
	setReminder,
	deleteReminder,
	editReminder,
	getProfile,
	getrem,
	getParticularReminder,
	getremfilter
	 
	 
} = require("../controller/Auth/AuthController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/getreminder/:createdby",protect, getrem);
router.get("/getremfilter/:createdby/:status",protect, getremfilter);
router.get("/getParticularReminder/:_id", protect,getParticularReminder);
 

router.get("/get-user-details", protect, getProfile);
 
router.put("/edit",protect,editReminder);
router.delete("/deleterem",protect,deleteReminder);
router.post("/set",protect,setReminder)
router.post("/login", login);
// router.post('/send-email',sendNotification)
 
 

module.exports = router;
