const {SlashCommandBuilder} = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête la musique !'),

    async execute(interaction) {
        try {
            const queue = useQueue(interaction.guild.id);
            queue.delete();
            await interaction.reply({content: client.config.messages.leavingChannel});
        }
        catch (e) {
            console.log(e);
            await interaction.reply({content: client.config.messages.error});
        }
    }
}