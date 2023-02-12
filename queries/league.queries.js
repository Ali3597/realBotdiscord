const League = require("../database/models/league.model")
const Bank = require("../database/models/bank.model")
const mongoose = require("mongoose");

exports.createLeague = async (league,bank= null) => {
    const newLeague = await  new League({
        ...league,
    }).save()
    if (bank){
    const newBank = await  new Bank({
        ...bank,
        league : newLeague
    }).save()
    newLeague.bank = newBank
     await newLeague.save()
}
return newLeague
};





exports.findLeaguesByDiscordIdAndGuildId = async (userId,guildId) => {
    return await League.find({ participants:  userId, guildId: guildId }).exec()
}
mongoose.Types.ObjectId('4ed3ede8844f0f351100000c')