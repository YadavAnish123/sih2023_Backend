const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { bool } = require("joi");
//import Reminder from './ReminderMode'
 

const userSchema = mongoose.Schema(
	{
		full_name: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		} 
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(15);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
