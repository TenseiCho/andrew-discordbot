const { AttachmentBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (message) => {
  const imagesDir = path.join(__dirname, '..', '..', 'images', 'blackSouls');
  try {
    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file));
    if (imageFiles.length === 0) {
      return message.reply('No image files found in the blackSouls folder.');
    }
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    const imagePath = path.join(imagesDir, randomImage);
    const attachment = new AttachmentBuilder(imagePath);
    await message.reply({ files: [attachment] });
  } catch (error) {
    console.error('Error posting random image:', error);
    message.reply('Sorry, an error occurred while posting the random image.');
  }
};