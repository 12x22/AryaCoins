const LOGGER = require("../../INITIALIZATION/logger")
const CONFIG = require("../../INITIALIZATION/config.js")
const DATABASE = require("../../INITIALIZATION/db.js")
const DISCORD = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (message.author.id !== "787326329510297620") return client.emit('ownerOnly', message);

    const pp = args[0];
    if(!pp) return message.channel.send('Veuillez spécifier un lien !');

    await bot.user.setAvatar(pp).then(() => {
        message.channel.send('La photo de profil a été modifiée avec succès.')
    }).catch(err => message.channel.send('Impossible de changer la photo de profil :\n' + codeBlock(null, err)));
}

module.exports.config = {
    category: "Owner  👑",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["setpp"],
    serverForced: true
}

module.exports.help = {
    name: "pp",
    category: "Owner"
};