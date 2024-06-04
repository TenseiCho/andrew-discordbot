const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

const loadCommands = (dir) => {
  const commandFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, dir, file));
    const commandName = file.slice(0, -3);
    client.commands.set(commandName, command);
  }
};

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
for (const folder of commandFolders) {
  loadCommands(path.join('commands', folder));
}

const PREFIX = '!'; // Change this to your desired prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (client.commands.has(CMD_NAME)) {
      client.commands.get(CMD_NAME)(message, args);
    }
  }
});

client.login(process.env.BOT_TOKEN);