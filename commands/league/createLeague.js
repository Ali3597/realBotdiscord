const { SlashCommandBuilder,ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle } = require('discord.js');

const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');



const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);


const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
modal.addComponents(firstActionRow);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createleague')
		.setDescription('allows you to create a league')
        .addStringOption(option =>
            option.setName('leaguename')
                .setDescription('The league name ')
                .setRequired(true)
                )
        .addIntegerOption(option =>
            option.setName('nbmaxmembers')
                .setDescription('The max member s league ')
                .setRequired(true)
                )
        .addIntegerOption(option =>
                    option.setName('startinggrant')
                        .setDescription('Thestarting grant of evry new users ')
                        .setRequired(true)
                        )
        .addBooleanOption(option =>
                    option.setName('open')
                        .setDescription('decides if anyone can join the league without an invitation')
                        .setRequired(true)
                        )
        .addBooleanOption(option =>
                            option.setName('bank')
                                .setDescription('decides if the league have a bank to make some loans')
                                .setRequired(true)
                            ),
            
	async execute(interaction) {
		const name = interaction.options.getString('leaguename') ;
        const nbMaxNumbers = interaction.options.getInteger('nbmaxmembers') ;
        const startingGrant = interaction.options.getInteger('startinggrant')
        const open = interaction.options.getBoolean('open') ;
        const bank = interaction.options.getBoolean('bank')
        if (bank){
            await interaction.showModal(modal);

            // Get the Modal Submit Interaction that is emitted once the User submits the Modal
            const submitted = await interaction.awaitModalSubmit({
            // Timeout after a minute of not receiving any valid Modals
            time: 60000,
            // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
            filter: i => i.user.id === interaction.user.id,
            }).catch(error => {
            // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
            console.error(error)
            return null
            })

            if (submitted) {
            console.log("voliiiiaiaiaiaiai",submitted.fields.getTextInputValue('favoriteColorInput'))
        }
        await submitted.deferUpdate()
    }
        console.log("voila mes inputs",name,nbMaxNumbers,startingGrant,open,bank)
        await interaction.followUp('testons ça ');
	},
};
// name 
// - nbMaxMembers:
// - Sport categorie a choisir ( //todo)
// - utilisateurs admin
// - Les différentes banques disponibles :
//   - Leur nombre maximum d'emprunt
//   - daysMax
//   - Pourcentage d'interet
// startinGrant
// - Date de fin
// - Boolean open


// interestRate:  { type: Number, required: true },
// maxAmount: { type: Number, required: true },
// daysMax : { type: Number, required: true },