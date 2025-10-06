const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Obtenez le ping du bot !'),
    async execute(interaction) {
        const m = await interaction.reply( { content: 'Ping?' });
        await interaction.editReply(`Pong! La latence de l'API est de ${Math.round(client.ws.ping)}ms 🛰️.`)
    }
}