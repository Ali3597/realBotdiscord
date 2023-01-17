const mongoose = require("mongoose");
const schema = mongoose.Schema;

const leagueSchema = schema({
    created_at: { type: Date, required: true },
    guildId: { type: String, required: true },
    closed_at:{ type: Date, default:null },
    participants : [{ type: schema.Types.ObjectId, ref: "user", required: true }],
    admins : [{ type: schema.Types.ObjectId, ref: "user", required: true }],
    currencyShops : [{ type: schema.Types.ObjectId, ref: "currencyShop", required: true }],
});



const League = mongoose.model("league", leagueSchema);

module.exports = League;
