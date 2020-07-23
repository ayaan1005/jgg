const prefix = process.env.PREFIX || require('../../config/settings.json').prefix;
const languages = require('../../data/languages.json');
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'lang',
  description: 'Change the TTS language.',
  emoji: ':map:',
  execute(message, options) {
    let [newLang] = options.args;
    const { ttsPlayer } = message.guild;

    if (!newLang) {
      message.channel.send(new MessageEmbed().setDescription(`to set-up the TTS language, run: **${prefix}lang <lang_code>**
      To see a list of the available lang codes, run: **${prefix}langs**.
      The current language is set to: **${languages[ttsPlayer.lang]}**.`)).setColor("RANDOM").setTimestamp();
      return;
    }

    newLang = newLang.toString().toLowerCase();

    ttsPlayer.setLang(newLang)
      .then((setLang) => {
        message.channel.send(new MessageEmbed().setDescription(`**Language Has Been Set To** \`${setLang}\`.`).setColor("RANDOM").setTimestamp());
      })
      .catch((error) => {
        message.reply(error);
      });
  }
}