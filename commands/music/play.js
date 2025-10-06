const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { QueryType } = require("discord-player");
const { playEmbeds } = require('../../src/embeds.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique depuis youtube !')
        .addStringOption(option =>
            option.setName('requête')
                .setDescription("Le nom / URL de la musique à jouer")
                .setRequired(true)
        ),

    async execute(interaction) {
        const player = useMainPlayer();
        try {
            await interaction.deferReply();
            const request = interaction.options.getString('requête');
            const channel = interaction.member.voice.channel;

            //Verifie si l'utilisateur est dans un salon vocal
            if (!interaction.member.voice.channel) {
                await interaction.followUp({ content: client.config.messages.userNotInVoiceChannel });
                return;
            }

            //Verifie si le bot peut rejoindre le salon vocal
            if (!interaction.member.voice.channel.joinable) {
                await interaction.followUp({ content: client.config.messages.voiceChannelNotJoinable });
                return;
            }

            //Verifie si le bot peut parler dans le salon vocal
            if (!interaction.member.voice.channel.permissionsFor(client.user).has(PermissionsBitField.Flags.Speak || PermissionsBitField.Flags.Connect)) {
                await interaction.followUp({ content: client.config.messages.botCannotTalk });
                return;
            }

            //Traitement de la requete
            try {
                const { track } = await player.play(channel, request, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                    nodeOptions: {
                        voiceChannel: channel,
                        leaveOnStop: true,
                        leaveOnStopCooldown: 5000,
                        leaveOnEnd: true,
                        leaveOnEndCooldown: 15000,
                        leaveOnEmpty: true,
                        leaveOnEmptyCooldown: 300000,

                        metadata: {
                            channel: interaction.channel,
                            client: interaction.client,
                            requestedBy: interaction.user,
                        }
                    },
                });

                //Envoie de l'embed
                const embed = playEmbeds(track);
                await interaction.followUp({ embeds: [embed] });
            }
            catch (e) {
                console.log(e);
                await interaction.followUp('Une erreur est survenue lors de la requête :\n' + e)
            }

        }
        catch (e) {
            console.log(e);
            await interaction.reply({ content: client.config.messages.error });
        }
    }
};