const mongoose = require("mongoose");
const schema = mongoose.Schema;

const currencyShopSchema = schema({
    guildId : { type: String, required: true },
    debts: [{ type: schema.Types.ObjectId, ref: "debt" }],
});



const currencyShop = mongoose.model("currencyShop", currencyShopSchema);

module.exports = currencyShop;
