const { AttachmentBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (message, args) => {
  if (!args[0]) {
    return message.reply('Please provide an image filename.');
  }
  const imagePath = path.join(__dirname, '..', 'images', args[0]);
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
};