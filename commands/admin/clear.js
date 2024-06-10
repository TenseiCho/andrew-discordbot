module.exports = async (message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to clear messages.');
    }
  
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('Please provide a valid number of messages to clear.');
    }
  
    if (amount < 1 || amount > 100) {
      return message.reply('Please provide a number between 1 and 100.');
    }
  
    try {
      await message.channel.bulkDelete(amount + 1);
      const confirmationMessage = await message.channel.send(`Successfully cleared ${amount} messages.`);
      setTimeout(() => confirmationMessage.delete(), 5000);
    } catch (error) {
      console.error('Error clearing messages:', error);
      message.reply('An error occurred while clearing messages.');
    }
  };