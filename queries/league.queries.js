const League = require("../database/models/league.model")
const Bank = require("../database/models/bank.model")


exports.createLeague = async (league,bank= null) => {
    if (bank){
        const newBank = new Bank({
            ...bank
        })
        bank = await newBank.save()
    }
    const newLeague = new League({
        ...league,
        bank : bank
    })
    return newLeague.save()
  };

  