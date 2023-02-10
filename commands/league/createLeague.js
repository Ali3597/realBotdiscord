const { SlashCommandBuilder,ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle } = require('discord.js');
const {createLeague} = require("../../queries/league.queries")
const {isThisUserRegisteredIfNotRegister} = require("../../utils/user.utils")

const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');



const maxAmount = new TextInputBuilder()
            .setPlaceholder("10000")
            .setRequired(true)
			.setCustomId('maxAmount')
		    // The label is the prompt the user sees for this input
			.setLabel("Maximum amount you can borrow")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);


const maxDays = new TextInputBuilder()
            .setValue("30")
            .setRequired(true)
			.setCustomId('maxDays')
		    // The label is the prompt the user sees for this input
			.setLabel("Maximum number of days for a loan")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);


const rate = new TextInputBuilder()
            .setValue("15")
            .setRequired(true)
			.setCustomId('rate')
		    // The label is the prompt the user sees for this input
			.setLabel("What is the reimbursement rate ?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);


//   - Leur nombre maximum d'emprunt
//   - daysMax
//   - Pourcentage d'interet


const firstActionRow = new ActionRowBuilder().addComponents(maxAmount);
const secondActionRow = new ActionRowBuilder().addComponents(maxDays);
const thirddActionRow = new ActionRowBuilder().addComponents(rate);

modal.addComponents(firstActionRow,secondActionRow,thirddActionRow);

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
                            )
        .addIntegerOption(option =>
                                option.setName('nbmaxmembers')
                                    .setDescription('The max member s league ')
                                    ),
            
	async execute(interaction) {
        let error= false
        let messageError = ""
        let userId = interaction.user.id
		const name = interaction.options.getString('leaguename') ;
        const nbMaxNumbers = interaction.options.getInteger('nbmaxmembers') ;
        const startingGrant = interaction.options.getInteger('startinggrant')
        const open = interaction.options.getBoolean('open') ;
        const bank = interaction.options.getBoolean('bank')
        let subMaxAmount = null
        let  subMaxDays = null
        let subRate = null
        if (bank)
        {
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
            subMaxAmount = submitted.fields.getTextInputValue('maxAmount')
            subMaxDays =submitted.fields.getTextInputValue('maxDays')
            subRate = submitted.fields.getTextInputValue('rate')
            if (!(parseInt(subMaxAmount) && parseInt(subMaxDays) && parseInt(subRate))){
                error = true
                messageError = "The max member s league , Maximum amount you can borrow and Maximum number of days for a loan must be integer "
            } 
        }
        await submitted.deferUpdate()
    }
    if (error){
        await interaction.followUp('We have not been able to create your league for the following reason:  '+ messageError);
    }else{
        const userCommand = await  isThisUserRegisteredIfNotRegister(userId)
        if (bank){
            const newBank = {
                interestRate:subRate,
                maxAmount: subMaxAmount,
                daysMax:subMaxDays,
                debts: []
            }
        }else{
            newBank = null
        }
        newLeague = {
            name,
            created_at: Date.now(),
            created_by:user,
            guildId :interaction.guild.id,
            nbMaxNumbers,
            startingGrant,
            participants : [{user}],
            admins: [{user}],
        }
        await createLeague(newLeague,bank)
        await interaction.followUp('testons ça ');
    }
	},
};

