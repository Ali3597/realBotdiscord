module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// try {
			console.log("ojn execute")
			await command.execute(interaction);
			console.log("pas dexecution")
		// } catch (error) {l
		// 	console.error(`Error executing ${interaction.commandName}`);
		// 	console.error(error);
		// }
	},
};