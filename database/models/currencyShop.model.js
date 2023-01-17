const mongoose = require("mongoose");
const schema = mongoose.Schema;

const currencyShopSchema = schema({
    rate:  { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    daysMax : { type: Number, required: true },
    debts: [{ type: schema.Types.ObjectId, ref: "debt" }],
    ligue: { type: schema.Types.ObjectId, ref: "ligue" },
});



const currencyShop = mongoose.model("currencyShop", currencyShopSchema);

module.exports = currencyShop;
