const TelegramBot = require('node-telegram-bot-api')
const token = '2110156771:AAEZ4hE3M-b0CgOkm84w-2zv1pbul9G8J8M'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})
bot.getMe().then(function (info) {
  console.log(`
${info.first_name} is ready, the username is @${info.username}
`, info)
})
