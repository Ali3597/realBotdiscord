const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
    amount : Number,
});



const User = mongoose.model("user", userSchema);

module.exports = User;
