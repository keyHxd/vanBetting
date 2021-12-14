require('dotenv').config()
const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (Message) => {
    if(Message.author.bot) return

    if (Message.content === 'ping') {
        Message.channel.send('pong')
    }
})


client.login(process.env.VANBETTING_BOT_TOKEN)
