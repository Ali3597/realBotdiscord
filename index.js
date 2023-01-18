const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
require("./database");


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsDirectoryPath = path.join(__dirname, 'commands');

fs.readdirSync(commandsDirectoryPath).forEach(dir => {
	const dirPath = path.join(commandsDirectoryPath, dir)
	const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const filePath = path.join(dirPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
})



const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);