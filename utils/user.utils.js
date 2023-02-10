
const {findUserByUserId,createUser} = require("../queries/user.queries")



exports.isThisUserRegisteredIfNotRegister= async (userId) => {
    let  user = await findUserByUserId(userId)
    if(!user){
       user  = await  createUser(userId)
    }
    return user 
}
