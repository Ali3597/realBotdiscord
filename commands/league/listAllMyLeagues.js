const { SlashCommandBuilder } = require('discord.js');
const {findLeaguesByDiscordIdAndGuildId} = require("../../queries/league.queries")
const {isThisUserRegisteredIfNotRegister} = require("../../utils/user.utils")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('listallmyleagues')
		.setDescription('Provides all leagues where the user is register in this guild'),
	async execute(interaction) {
		discordUserId = interaction.user.id
		guildId = interaction.guild.id
		const userCommand = await  isThisUserRegisteredIfNotRegister(discordUserId)
		const leagues = await findLeaguesByDiscordIdAndGuildId(userCommand._id,guildId)
		message = " Vous participez a ces leagues de cette guildes "
		leagues.forEach(league =>{
			console.log("okokokokokokok")
			console.log(league)
			message += league.name
		})


		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(message);
	},
};