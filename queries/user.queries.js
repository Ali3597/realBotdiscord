const User = require("../database/models/user.model")


exports.findUserByDiscordId =  (discordId) => {
return User.findOne({ discordId: discordId }).exec();
  };



  exports.createUser =  (discordId) => {
        const newUser = new User({
            discordId
        })
        return newUser.save()
      };


exports.addLeagueToUser= (league,user) => {
    leagueUser = {
        league,
        debts:[],
        amount: league.startingGrant
    }
       
    User.updateOne(
        { _id: user._id },
        { $push: { leagues: leagueUser } }
     )

}
