const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingdomfemboys.mcsh.io',
    port: 25565,
    username: 'bot', // !!! Напишите тут свой ник из VCMC вместо этих слов !!!
    auth: 'offline',
    version: '1.21.4'
  });

  bot.on('spawn', () => {
    console.log('Бот успешно зашел на сервер!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000); 
  });

  bot.on('end', (reason) => {
    console.log(`Бот отключился: ${reason}. Перезапуск через 10 секунд...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Ошибка:', err));
}

createBot();
