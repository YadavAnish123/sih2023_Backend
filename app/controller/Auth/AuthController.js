const User = require("../../model/UserModel");
const Remind=require("../../model/ReminderMode")
const axios = require('axios');
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
 
 

const asynchandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const dotenv = require("dotenv").config();
 
const registerUser = asynchandler(async (req, res) => {
	try {
		console.log("userRegister is calling")
		const { full_name, email,  password} = req.body;
		const userExist = await User.findOne({ email});
		if (userExist) {
			return res.status(409).json({ status: false, message: "Email already in use" });
		}
		const user = await User.create({
			full_name,
			email,
			password
			 
		});

		if (user) {
			const Getdata = await User.findOne({ _id: user._id })
			res.status(201).json({
				status: true,
				message: "register successfully",
				data: Getdata,
				token: generateToken(user._id),
			});
		} else {
			res.status(404).json({
				status: false,
				message: "Error Occured",
			});
		}
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});

 

 

 

 

 

const getProfile = asynchandler(async (req, res) => {
	try {
		const { user_id } = req.params;

		const sssd = await User.findOne({ _id: user_id }) 
		res.status(200).json({
			status: true,
			message: "data saved",
			data: sssd
		});
	} catch (e) {
		res.status(500).json({
			status: false,
			message: "server error",
		});
	}
});

const login = asynchandler(async (req, res) => {
	try {
		console.log("log is calling")
		const { email, password} = req.body;
		console.log(email,password)
			const comp = await User.findOne({ email });
			const d=await Remind.find({"createdby":{_id:comp._id}})
			if (comp && (await comp.matchPassword(password))) {
				console.log(1)
				 
				res.status(201).json({
					status: true,
					message: "logged in",
					data: comp,
					Reminder:d,
					token: generateToken(comp._id),
				});
			} else {
				res.status(400).json({
					status: false,
					message: "invalid email or password",
				});
			}
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});
const  editReminder=asynchandler(async(req,res)=>{
	try {
		console.log("edit reminder is calling")
		const {title,description,status,_id}=req.body
		const updatedFields = {};

        
        if (title) updatedFields.title = title;
         
        if (description) updatedFields.description = description;
        if (status) updatedFields.status = status;
		//console.log(updatedFields)
		const updatedUser = await Remind.findByIdAndUpdate(_id, updatedFields);
		const u=await Remind.findById(_id)
		const data=await Remind.find({"createdby": u.createdby})
		res.status(200).json({
			status: true,
			message:u,
			data:data
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});

const  setReminder=asynchandler(async(req,res)=>{
	try {
		 console.log("set reminder is calling")
		const {title,description,status,createdby}=req.body
		console.log(title)
		// const d=Remind.insertOne({createdby:id,date:date,subject:subject,description:description,email:email,contact:contact,sms:sms,recurfornext:recurfornext})
		const newUser = new Remind({
            createdby,
			title,description,status
		});
		newUser.save();
		//const d=newUser.populate("createdby")
		const d=await Remind.find({"createdby": createdby})
		 
		res.status(200).json({
			status: true,
			message:d
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});


const  deleteReminder=asynchandler(async(req,res)=>{
	try {
		console.log("deleted reminder is calling")
		console.log(req.body)
		 const {_id}=req.body;
		 const d=await Remind.findByIdAndDelete({_id:_id});
		 console.log(d);
		 const data=await Remind.find({"createdby": d.createdby})
		res.status(200).json({
			status: true,
			message:data,
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});

const  getrem=asynchandler(async(req,res)=>{
	try {
		console.log("getdata call")
		 
		 const {createdby}=req.params;

		 console.log(createdby)
		 const d=await Remind.find({createdby:createdby}).populate("createdby");
		 
		 //console.log(d)
		res.status(200).json({
			status: true,
			message:d,
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});

const  getremfilter=asynchandler(async(req,res)=>{
	try {
		console.log("getdata call")
		 
		 const {createdby,status}=req.params;
          
		  
		 const d=await Remind.find({createdby:createdby}).populate("createdby");
		//  const filteredReminders = d.filter(reminder => reminder.status.toLowerCase() === status.toLowerCase());
		 const inProgressReminders = d.filter(reminder => reminder.status.toLowerCase() === status.toLowerCase());
		 const otherReminders = d.filter(reminder => reminder.status.toLowerCase() !== status.toLowerCase());
 
		 // Combine the two arrays with in-progress reminders on top
		 const combinedReminders = inProgressReminders.concat(otherReminders);
        // console.log(filteredReminders);
           
		 //console.log(d)
		res.status(200).json({
			status: true,
			message:combinedReminders,
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});


 
const  getParticularReminder=asynchandler(async(req,res)=>{
	try {
		console.log("getparticular call")
		 
		 const {_id}=req.params;
		 console.log(_id)

		  
		 const d=await Remind.findById({_id:_id});
		 
		 //console.log(d)
		res.status(200).json({
			status: true,
			message:d,
		});
			 
	} catch (e) {
		res.status(500).json({
			status: false,
			message: e.message,
		});
	}
});


 

 

 

 

 

 






 
module.exports = {
	registerUser,
	login,
	editReminder,
	setReminder,
	deleteReminder,
	getProfile,
	getrem,
	getParticularReminder,
	getremfilter
	
	 
};
