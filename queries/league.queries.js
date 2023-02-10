const League = require("../database/models/league.model")
const Bank = require("../database/models/bank.model")


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

  