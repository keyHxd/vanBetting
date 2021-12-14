require('dotenv').config()
const Discord = require('discord.js')
const { Client, Intents, Message} = require('discord.js');
const Console = require("console");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', Message => {
    Console.log(Message.content)
})


client.login(process.env.VANBETTING_BOT_TOKEN)
