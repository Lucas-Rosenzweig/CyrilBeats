const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.js');

const commands = [];
//Récupération des commandes
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Récupération des fichiers de commandes
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Récupération du nom de la commande et de sa description
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] La commande ${filePath} n'a pas de data ou d'execute`);
        }
    }
}

//Construit la requête
const rest = new REST().setToken(config.app.token);

// and deploy your commands!
let promise = (async () => {
        try {
            console.log(`Rechargement de ${commands.length} commandes d'application (/)`);
            if (config.app.global) {
                const data = await rest.put(
                    Routes.applicationCommands(config.app.clientId),
                    { body: commands },
                );
                console.log(`Rechargement de ${data.length} commandes d'application (/) réussi.`);
            }
            else {
                const data = await rest.put(
                    Routes.applicationGuildCommands(config.app.clientId, config.app.guild),
                    { body: commands },
                );
                console.log(`Rechargement de ${data.length} commandes d'application (/) réussi.`);
            }

        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
})();
