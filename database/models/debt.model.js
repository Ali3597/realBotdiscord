const mongoose = require("mongoose");
const schema = mongoose.Schema;

const debtSchema = schema({
    created_at: { type: Date, required: true },
    rate:  { type: Number, required: true },
    deadline: { type: Date, required: true },
    done: { type: Boolean, default: false },
    user : { type: schema.Types.ObjectId, ref: "user", required: true },
    currencyShop : { type: schema.Types.ObjectId, ref: "currencyShop", required: true },
});



const Debt = mongoose.model("debt", debtSchema);

module.exports = Debt;
