const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const remindershema = mongoose.Schema(
	{

		createdby: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		title: {
			type: String,
			require: true
		},
		description: {
			type: String,
			require: true
		},
		status: {
			type: String,
			require: true
		} 
	}
)

const Reminder = mongoose.model("Reminder", remindershema);
module.exports = Reminder;
