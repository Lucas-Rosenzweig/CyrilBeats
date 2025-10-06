const { Events ,ActivityType} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute() {

        //On defini le status du bot
        client.user.setActivity('les bg s\'installer dans la salle', { type: ActivityType.Watching });

        console.log('Connnecté en tant que ' + client.user.tag);
    },
};
