const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { useQueue, useTimeline } = require('discord-player');
const { progressBar, pourcentage, strDurationToSeconds } = require('../../src/progressBar.js');
const { queueEmbeds } = require('../../src/embeds.js');
const {queueAsset} = require("../../src/assetGen");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Affiche la file d\'attente !')
    .addSubcommand(subcommand =>
        subcommand
            .setName('embed')
            .setDescription('Affiche la file d\'attente sous forme d\'embed !'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('image')
        .setDescription('Affiche la file d\'attente sous forme d\'image !')),

    async execute(interaction) {
        try {
            // Récupération de la file d'attente et attente de la réponse
            const queue =  useQueue(interaction.guild.id);
            await interaction.deferReply();

            // Vérification de la présence de pistes dans la file d'attente
            if (!queue ) {
                await interaction.followUp({ content: client.config.messages.noMusicPlaying });
                return;
            }

            // Récupération des informations de piste actuelle
            const currentPlayingTrack = await queue.currentTrack;
            const timeline = useTimeline(interaction.guildId);
            const tracksArray = queue.tracks.toArray();

            // Calcul de la durée totale en secondes
            const totalDuration = strDurationToSeconds(currentPlayingTrack.duration);
            const pourcent= pourcentage(currentPlayingTrack.duration, timeline.timestamp.current.label)


            //Si l'utilisateur a utilisé la sous commande embed
            if (interaction.options.getSubcommand() === 'embed') {

                const asset = await progressBar(pourcent);
                const attachment = new AttachmentBuilder(await asset, { name: 'progressBar.png' });

                const embed = queueEmbeds(currentPlayingTrack, tracksArray, timeline, totalDuration);
                embed.setImage('attachment://progressBar.png')

                await interaction.followUp({ embeds: [embed] ,files: [attachment]});

            }

            //Si l'utilisateur a utilisé la sous commande image
            else if (interaction.options.getSubcommand() === 'image') {

                const asset = queueAsset(currentPlayingTrack.thumbnail, currentPlayingTrack.title,pourcent, timeline.timestamp.current.label, currentPlayingTrack.duration, tracksArray);
                const attachment = new AttachmentBuilder(await asset, { name: 'queueAsset.png' });
                await interaction.followUp({files: [attachment] });
            }

        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: client.config.messages.error });
        }
    }
};
