const fs = require('fs').promises;
const path = require('path');

module.exports = async (message) => {
  const imagesDir = path.join(__dirname, '..', 'images');
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
};