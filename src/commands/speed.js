const prefix = process.env.PREFIX || require('../../config/settings.json').prefix;
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: 'speed',
  description: 'Change the TTS spoken speed (must be between 1% and 100%).',
  emoji: ':fast_forward:',
  execute(message, options) {
    let [newSpeed] = options.args;
    const { ttsPlayer } = message.guild;

    if (!newSpeed) {
      message.channel.send(new MessageEmbed().setDescription(`to set-up the TTS speed, type: **${prefix}speed <speed>** and replace *<speed>* with a number between 1 and 100.`).setColor("RANDOM").setTimstamp());
      return;
    }

    newSpeed = parseInt(newSpeed, 10);

    ttsPlayer.setSpeed(newSpeed)
      .then((setSpeed) => {
        message.reply(`speaking speed has been set to: **${setSpeed}%**`);
      })
      .catch((error) => {
        message.reply(error);
      });
  }
}