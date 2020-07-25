const { Logger } = require('logger');
const { MessageEmbed } = require("discord.js")
const logger = new Logger();

module.exports = {
  name: 'aeiou',
  description: 'Send an aeiou (similar to Moonbase Alpha) TTS message in your voice channel.',
  emoji: ':robot:',
  execute(message, options) {
        const bb = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Command Disable!")
    .setDescription("This Command Is Currently Disabled By Developers")
    .setFooter("It Will Be Enabled As Soon As Possible")
    return message.channel.send(bb)
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = voice ? voice.connection : null;
    const [atLeastOneWord] = options.args;

    if (!channel) {
      message.channel.send(new MessageEmbed().setDescription('**You Need To Be In A Voice Channel First.**').setColor("RANDOM").setTimestamp());
      return;
    }

    if (!channel.joinable) {
      message.channel.send(new MessageEmbed().setDescription('**I Cannot Join Your Voice Channel.**').setColor("RANDOM").setTimestamp());
      return;
    }

    if (!atLeastOneWord) {
      message.channel.send(new MessageEmbed().setDescription('**You Need To Specify A Message.**').setColor("RANDOM").setTimestamp());
      return;
    }

    if (connection) {
      ttsPlayer.aeiou(options.args);
    } else {
      channel.join()
        .then(() => {
          logger.info(`Joined ${channel.name} in ${guildName}.`);
          message.channel.send(new MessageEmbed().setDescription(`Joined ${channel}.`).setColor("RANDOM").setTimestamp());
          ttsPlayer.aeiou(options.args);
        })
        .catch((error) => {
          throw error;
        });
    }
  }
}