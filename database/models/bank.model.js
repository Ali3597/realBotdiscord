const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bankSchema = schema({
    interestRate:  { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    daysMax : { type: Number, required: true },
    debts: [{ type: schema.Types.ObjectId, ref: "debt" }],
    league: { type: schema.Types.ObjectId, ref: "league" },
});



const Bank = mongoose.model("bank", bankSchema);

module.exports = Bank;
             