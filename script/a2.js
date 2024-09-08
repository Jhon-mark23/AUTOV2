const axios = require('axios');

module.exports.config = {
  name: 'a2',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['a2', 'ai2'],
  description: "An AI command powered by GPT-3.5 Turbo",
  usage: "A2 [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'aiv2'. For example: 'aiv2 What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage('Please wait...', event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://nash-rest-api.vercel.app/gpt-3.5_turbo?prompt=${encodeURIComponent(input)}`);
    const response = data.result.reply;

    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
