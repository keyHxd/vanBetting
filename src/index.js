require('dotenv').config()
const fs = require('fs')
const { Client, Intents, Collection} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const prefix = "$"
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  console.log(command.name);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})

client.login(process.env.VANBETTING_BOT_TOKEN)
