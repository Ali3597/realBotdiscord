const User = require("../database/models/user.model")


exports.findUserByUserId =  (userId) => {
return User.findOne({ userId: userId }).exec();
  };



  exports.createUser =  (userId) => {
        const newUser = new User({
            userId 
        })
        return newUser.save()
      };


exports.addLeagueToUSer= (league,amount,user) => {
    leagueUser = {
        league,
        debts:[],
        amount
    }
       
    User.updateOne(
        { _id: user._id },
        { $push: { leagues: leagueUser } }
     )

}