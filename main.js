const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = '!'; // Change this to your desired prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'hello') {
      message.reply('Hello! How can I assist you today?');
    } else if (CMD_NAME === 'ping') {
      message.reply('Pong!');
    } else if (CMD_NAME === 'postimage') {
      if (!args[0]) {
        return message.reply('Please provide an image filename.');
      }
      const imagePath = path.join(__dirname, 'images', args[0]);
      try {
        await fs.access(imagePath);
        const attachment = new AttachmentBuilder(imagePath);
        await message.reply({ files: [attachment] });
      } catch (error) {
        console.error('Error posting image:', error);
        if (error.code === 'ENOENT') {
          message.reply('The specified image file does not exist.');
        } else {
          message.reply('Sorry, an error occurred while posting the image.');
        }
      }
    } else if (CMD_NAME === 'images') {
      const imagesDir = path.join(__dirname, 'images');
      try {
        const files = await fs.readdir(imagesDir);
        const imageFiles = files.filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file));
        if (imageFiles.length === 0) {
          return message.reply('No image files found in the images folder.');
        }
        const fileList = imageFiles.map(file => `- ${file}`).join('\n');
        message.reply(`Available image files:\n${fileList}`);
      } catch (error) {
        console.error('Error retrieving image files:', error);
        message.reply('Sorry, an error occurred while retrieving the image files.');
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);