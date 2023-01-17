const {createBank } = require("../queries/bank.queries");
const {createLeague } = require("../queries/league.queries");


exports.createNewLeague = async (nbMaxMembers, endDate, open, created_by,banks) => {
    banksCreated = []
    for (bank in banks){
        newBank = await createBank(bank)
        banksCreated.push(newBank)
    }
    newLeague = await createLeague(nbMaxMembers, endDate, open,created_by,banksCreated)
    return newLeague
  };

