const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
    userId :  { type: String, required: true },
    amount : { type: Number, default: 0 },
    debts: [{ type: mongoose.Types.ObjectId, ref: 'debt' }]
});



const User = mongoose.model("user", userSchema);

module.exports = User;
