const LOGGER = require("../../INITIALIZATION/logger")
const CONFIG = require("../../INITIALIZATION/config.js")
const DATABASE = require("../../INITIALIZATION/db.js")
const DISCORD = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (message.author.id !== "787326329510297620") return client.emit('ownerOnly', message);

    if(args.join(" ").length > 23) return message.channel.send('Le nom d\'utilisateur ne doit pas faire plus de 20 caractères.');

    await bot.user.setUsername(args.join(" ")).then(() => {
        message.channel.send('Le nom d\'utilisateur a été modifié avec succès');
    }).catch(err => {
        message.channel.send("Impossible de changer le nom d'utilisateur : \n ```\n"+ err + "\n```");
    });
} 

module.exports.config = {
    category: "Owner  👑",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["setname"],
    serverForced: true
}


module.exports.help = {
    name: "name",
    category: "Owner"
};