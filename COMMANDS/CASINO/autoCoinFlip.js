/////* || [INITIALIZATION] || */////
const LOGGER = require("../../INITIALIZATION/logger")
const CONFIG = require("../../INITIALIZATION/config.js")
const DATABASE = require("../../INITIALIZATION/db.js")
const DISCORD = require("discord.js");
const FS = require("fs")
const CANVAS = require("canvas");
var isPlayed = {};

/////* || [ACTIONS] || */////
module.exports.run = async(CLIENT, message, ARGS, PREFIXARRAY) => {
    message.channel.send("coinflip auto lancé")
    setInterval(async () => {
        let channel = CLIENT.channels.resolve(message.channel.id);
        
    let steps = ["**Début dans quelques secondes.**", "**Début dans quelques secondes..**", "**Début dans quelques secondes...**", "**Début dans quelques secondes.**", "**Début dans quelques secondes..**", "**Début dans quelques secondes...**", "**Début dans quelques secondes.**", "**Début dans quelques secondes..**", "**Début dans quelques secondes...**"];
    let mise = parseFloat(Math.floor(Math.random() * 1000));
    let time = 1000;
    var userMise = {};
    var userParticipate = [];

    let confirm = await channel.send(new DISCORD.MessageEmbed()
                        .setTitle(`Pile ou Face ?`)
                        .setDescription(`La mise est de _**${mise} AR$**_\n\n1️⃣ pile **X2**\n2️⃣ face **X2**\n\n Vous avez 30 secondes pour choisir.`)
                        .setImage("https://acegif.com/wp-content/uploads/coin-flip.gif")
                        )
                        confirm.react("1️⃣"); confirm.react("2️⃣");

                        const filter = (reaction, user) => {
                            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot;
                        };

                        const collector = confirm.createReactionCollector(filter, { time: 30000 });
                        collector.on("collect", (reaction, user) => {
                            if (reaction.emoji.name === '1️⃣') {
                                DATABASE.CheckUserInDB(user.id);
                                DATABASE.DB.query("SELECT * FROM coins WHERE user_id = ?", user.id, function(err, rows){
                                    if(err) LOGGER.error(err);
                                    if(rows.length < 1){} else {
                                        let userCoins = rows[0].user_coins;

                                        if(userCoins < mise){
                                            return user.send("Vous n'avez pas assez d'argent.")
                                        } else {
                                            userMise[user.id] = "pile"
                                            if(!userParticipate.includes(user.id)) userParticipate.push(user.id)
                                        }
                                    }
                                })
                            }
                            if (reaction.emoji.name === '2️⃣') {
                                DATABASE.CheckUserInDB(user.id);
                                DATABASE.DB.query("SELECT * FROM coins WHERE user_id = ?", user.id, function(err, rows){
                                    if(err) LOGGER.error(err);
                                    if(rows.length < 1){} else {
                                        let userCoins = rows[0].user_coins;

                                        if(userCoins < mise){
                                            return user.send("Vous n'avez pas assez d'argent.")
                                        } else {
                                            userMise[user.id] = "face"
                                            if(!userParticipate.includes(user.id)) userParticipate.push(user.id)
                                        }
                                    }
                                })
                            }
                        })

                        collector.on('end', collected => {

                            
                        let colorArr = ["1️⃣", "2️⃣"]
                        let color;
                        let couleurGagnante = colorArr[Math.floor(Math.random() * colorArr.length)];
                        let result;
                        let imageF;

                        if(couleurGagnante === "1️⃣") {color = "#ff0000"; result = "pile"; imageF = "http://pileouface.org/pile1.png"}
                        if(couleurGagnante === "2️⃣") {color = "#008000"; result = "face"; imageF = "http://pileouface.org/face1.png"}


                        let stringGagnant = "";
                        var alreadyGived = {};
                        userParticipate.forEach(user => {
                            if(userMise[user] === result){
                                stringGagnant += `<@${user}> `
                                DATABASE.DB.query("SELECT * FROM coins WHERE user_id = ?", user, function(err, rows){
                                    if(err) LOGGER.error(err);
                                    if(rows.length < 1){} else {
                                        let argent = rows[0].user_coins;
                                        let finalArgent;
                                        if(result == "pile" || result == "face") finalArgent = mise + argent;
                                        DATABASE.DB.query("UPDATE coins SET user_coins = ? WHERE user_id = ?", [finalArgent, user])
                                    }
                                })
                            }  else {
                                DATABASE.DB.query("SELECT * FROM coins WHERE user_id = ?", user, function(err, rows){
                                    if(err) LOGGER.error(err);
                                    if(rows.length < 1){} else {
                                        let argent = rows[0].user_coins;
                                        let finalArgent = argent - mise;
                                        DATABASE.DB.query("UPDATE coins SET user_coins = ? WHERE user_id = ?", [finalArgent, user])
                                    }
                                })
                            }
                        })

                        if(stringGagnant.length < 1) stringGagnant = "aucun"
                        channel.send(new DISCORD.MessageEmbed()
                            .setImage(imageF)
                            .setTitle(result)
                        )
                        channel.send(`Les gagnants sont: ${stringGagnant}`)
                        isPlayed[message.channel.id] = false;
                        });
                    }, 180000)

}



module.exports.config = {
    category: "Owner  👑",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["autopileface"],
    serverForced: true
}

module.exports.help = {
    description: "Commande pour jouer au coinflp",
    utilisations: `.autoCoinFlip`,
    exemples: `.autoCoinFlip`
}