const { EmbedBuilder } = require('discord.js');
const {strDurationToSeconds, secondsToString} = require("./progressBar");

module.exports = { queueEmbeds , playEmbeds, skipEmbeds} ;

function playEmbeds(track) {

    return new EmbedBuilder()
        .setTitle(`Rajout de ${track.title} a la file d\'attente !`)
        .setDescription(`Durée : ${track.duration} - Requis par ${track.requestedBy}`)
        .setThumbnail(track.thumbnail)
        .setColor(color)
}
function queueEmbeds(currentTrack, tracks, timestamp, totalDuration) {

    const embed = new EmbedBuilder()
        .addFields(
            {
                name: 'En cours de lecture',
                value: `${currentTrack.title} | ${timestamp.timestamp.current.label} / ${currentTrack.duration}`
            }
        )
        .setColor(color)
        .setThumbnail(currentTrack.thumbnail)

    if (tracks.length > 0) {

        let names = "";
        let durations = "";
        let users = "";


        for (let i = 0; i < tracks.length; i++) {
            const truncatedTitle = tracks[i].title.length > 12 ? tracks[i].title.substring(0, 12 - 3) + "..." : tracks[i].title;
            names += `${truncatedTitle}\n`;
            durations += `${tracks[i].duration}\n`;
            users += `<@${tracks[i].requestedBy.id}>\n`;
            totalDuration += strDurationToSeconds(tracks[i].duration);
        }

        embed.addFields(
            {
                name: 'Son',
                value: `${names}`,
                inline: true
            },
            {
                name: 'Durée',
                value: `${durations}`,
                inline: true
            },
            {
                name: 'Utilisateur',
                value: `${users}`,
                inline: true
            }
        )
    }

    embed.setFooter({
        text: `Durée totale de la file d'attente : ${secondsToString(totalDuration)}`,
        iconURL: `${client.user.avatarURL()}`,
    });

    return embed;
}

function skipEmbeds(track) {
    return new EmbedBuilder()
        .setTitle(`On passe a la musique suivante : ${track.title} !`)
        .setDescription(`Durée : ${track.duration} - Requis par ${track.requestedBy}`)
        .setThumbnail(track.thumbnail)
        .setColor(color)
}
