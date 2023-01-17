const mongoose = require("mongoose");
const schema = mongoose.Schema;

const currencyShopSchema = schema({
    interestRate:  { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    daysMax : { type: Number, required: true },
    debts: [{ type: schema.Types.ObjectId, ref: "debt" }],
    league: { type: schema.Types.ObjectId, ref: "league" },
});



const currencyShop = mongoose.model("currencyShop", currencyShopSchema);

module.exports = currencyShop;
