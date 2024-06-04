const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');

module.exports = async (message) => {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('You need to be in a voice channel to use this command!');
  }

  const audioPath = path.join(__dirname, '..', '..', 'audio', 'Skibidi.opus');
  if (!fs.existsSync(audioPath)) {
    return message.reply('The audio file does not exist!');
  }

  try {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    const resource = createAudioResource(audioPath, { volume: 0.5 });

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });

    connection.subscribe(player);
    player.play(resource);

    await message.reply('Playing Skibidi in the voice channel!');
  } catch (error) {
    console.error('Error playing audio:', error);
    message.reply('An error occurred while playing the audio.');
  }
};