const LOGGER = require("../../INITIALIZATION/logger")
const CONFIG = require("../../INITIALIZATION/config.js")
const DATABASE = require("../../INITIALIZATION/db.js")
const DISCORD = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (message.author.id !== "787326329510297620") return client.emit('ownerOnly', message);

    if(args.join(" ").length > 20) return message.channel.send('Le statut du bot ne doit pas faire plus de 20 caractères.');

    await bot.user.setActivity(args.join(' '), { type: 'STREAMING', url: 'https://www.twitch.tv/ZerooTV_' }).then(() => {
        message.channel.send('Le statut du bot a été modifié avec succès');
    }).catch(err => {
        message.channel.send("Impossible de changer le statut du bot : \n ```\n"+ err + "\n```");
    });
}

module.exports.config = {
    category: "Owner  👑",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["stream"],
    serverForced: true
}

module.exports.help = {
    name: "stream"
};