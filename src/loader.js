const fs = require('node:fs');
const path = require('node:path');
const {Collection ,REST, Routes} = require("discord.js");

//Command Loader
client.commands = new Collection();
const foldersPath = path.join(__dirname, '../commands');
const folders = fs.readdirSync(foldersPath);

console.log('-'.repeat(50))
console.log('[CMD] Chargement des commandes...');
for (const folder of folders) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath);

        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
            console.log(`[CMD] Commande ${command.data.name} chargée avec succès`);
        }
        else {
            console.log(`[CMD] La commande ${file} n'a pas de data ou d'execute`);
        }
    }
}
console.log('[CMD] Chargement des commandes terminé');
console.log('-'.repeat(50))
console.log('[EVT] Chargement des events...');
//Event Loader
const eventPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        console.log(`[EVT] Event ${event.name} chargé avec succès`);
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
        console.log(`[EVT] Event ${event.name} chargé avec succès`);
    }
}
console.log('-'.repeat(50))