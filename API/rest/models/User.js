const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	hoursWorked: Number,
});

module.exports = mongoose.model("User", schema);