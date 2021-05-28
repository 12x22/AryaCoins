module.exports.run = async (client, message, args) => {
    if(message.author.id !== "787326329510297620" ) return client.emit('ownerOnly', message);
    message.channel.send('le bot ce stoppe.').then(async() => {
        await client.destroy();
        process.exit();
    })
};

module.exports.config = {
    category: "Owner  👑",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["stop"],
    serverForced: true
}

module.exports.help = {
    name: "stop",
    aliases: ["stop"],
	category: 'Owner',
    description: "Redémarrer le bot",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: [],
    args: false,
};