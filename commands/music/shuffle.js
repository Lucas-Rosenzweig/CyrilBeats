const {SlashCommandBuilder} = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Mélange la file d\'attente !'),

    async execute(interaction) {
        try {
            const queue = useQueue(interaction.guild.id);
            queue.tracks.shuffle();
            await interaction.reply({content: client.config.messages.queueShuffle});
        }
        catch (e) {
            console.log(e);
            await interaction.reply({content: client.config.messages.error});
        }
    }
}