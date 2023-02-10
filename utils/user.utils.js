
const {findUserByDiscordId,createUser} = require("../queries/user.queries")



exports.isThisUserRegisteredIfNotRegister= async (discordId) => {
    let  user = await findUserByDiscordId(discordId)
    if(!user){
       user  = await  createUser(discordId)
    }
    return user 
}
