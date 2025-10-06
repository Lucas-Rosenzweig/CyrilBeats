// events/playerError.js
module.exports = {
    name: 'playerError',
    once: false,

    /**
     * @param {import('discord-player').GuildQueue} queue
     * @param {Error} error
     */
    execute(queue, error) {
        console.error(`❌ Player error in ${queue.guild.name}:`, error);

        const channel = queue?.metadata?.channel;
        if (channel) {
            channel.send(`❌ Une erreur est survenue pendant la lecture :\n\`${error.message}\``)
                .catch(() => { });
        }
    }
};