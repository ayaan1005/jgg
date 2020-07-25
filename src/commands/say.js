const { Logger } = require('logger');
const { splitToPlayable } = require('../common/utils');
const allowOver200 = process.env.ALLOW_OVER_200 || require('../../config/settings.json').allow_more_than_200_chars;
const { MessageEmbed } = require("discord.js")

const logger = new Logger();

module.exports = {
  name: 'tts',
  description: `Send a TTS message in your voice channel${allowOver200 ? '.' : ' (Up to 200 characters).'}`,
  emoji: ':speaking_head:',
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
      splitToPlayable(options.args)
        .then((phrases) => {
          ttsPlayer.say(phrases);
        })
        .catch((error) => {
          message.reply(error);
        });
    } else {
      channel.join()
        .then(() => {
          logger.info(`Joined ${channel.name} in ${guildName}.`);
          message.channel.send(new MessageEmbed().setDescription(`Joined ${channel}.`).setColor("RANDOM").setTimestamp());
          splitToPlayable(options.args)
            .then((phrases) => {
              ttsPlayer.say(phrases);
            })
            .catch((error) => {
              message.reply(error);
            });
        })
        .catch((error) => {
          throw error;
        });
    }
  }
}