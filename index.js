const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

global.client = client;

client.config = require('./config.js');
require('./src/loader.js');

//Definis les couleur de l'embed
global.color = client.config.app.color;
if (color === undefined) {
    color = "#af33c1";
}

const player = new Player(client);
player.extractors.register(YoutubeiExtractor, {});
client.login(client.config.app.token);