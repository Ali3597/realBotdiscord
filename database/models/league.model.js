const mongoose = require("mongoose");
const schema = mongoose.Schema;

const leagueSchema = schema({
    name:{ type: String, required: true },
    created_at: { type: Date, required: true },
    created_by : { type: schema.Types.ObjectId, ref: "user", required: true },
    guildId: { type: String, required: true },
    closed_at:{ type: Date, default:null },
    nbMaxMembers: { type: Number, default: null },
    startinGrant:{ type: Number, required:true },
    participants : [{ type: schema.Types.ObjectId, ref: "user", required: true }],
    admins : [{ type: schema.Types.ObjectId, ref: "user", required: true }],
    bank : { type: schema.Types.ObjectId, ref: "bank", default: null},
});



const League = mongoose.model("league", leagueSchema);

module.exports = League;
