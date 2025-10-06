const {SlashCommandBuilder} = require('discord.js');
const { useQueue } = require('discord-player');
const { skipEmbeds } = require('../../src/embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe à la musique suivante !'),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const queue = useQueue(interaction.guild.id);
            queue.node.skip();

            if (queue.tracks.toArray()[0] === undefined) {
                await interaction.followUp({content: client.config.messages.nothingToPlayNext});
            } else {
                const embed = skipEmbeds(queue.tracks.toArray()[0]);
                await interaction.followUp({embeds: [embed]});
            }
        } catch (e) {
            console.log(e);
            await interaction.followUp({content: client.config.messages.error});
        }
    }
}