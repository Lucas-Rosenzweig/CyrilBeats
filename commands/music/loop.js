const {SlashCommandBuilder} = require('discord.js');
const {useQueue} = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Mettez la musique en boucle !')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription("Le mode de boucle à activer")
                .setRequired(true)
                .addChoices(
                    {name: "disable", value: "0"},
                    {name: "current", value: "1"},
                    {name: "queue", value: "2"},
                    {name: "autoplay", value: "3"},
                )
        ),
    async execute(interaction) {

        const mode = parseInt(interaction.options.getString('mode'));
        const modes = ["désactivé", "actuel", "file d'attente", "lecture automatique"];
        const queue = useQueue(interaction.guildId);
        queue.setRepeatMode(mode);

        await interaction.reply({content: `Le mode de boucle a été défini sur ${modes[mode]}`});


    }
}