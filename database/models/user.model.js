const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
    discordId :  { type: String, required: true },
    leagues: [{
       league: { type: mongoose.Types.ObjectId, ref: 'league' },
       debts: [{ type: mongoose.Types.ObjectId, ref: 'debt' }],
       amount : { type: Number, default: 0 },
}]
});


const User = mongoose.model("user", userSchema);

module.exports = User;
