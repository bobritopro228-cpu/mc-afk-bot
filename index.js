const mineflayer = require('mineflayer');
const express = require('express');

// Создаем простейший веб-сайт, чтобы хостинг Render не выдавал ошибку портов
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Бот активен и работает 24/7!');
});

app.listen(port, () => {
  console.log(`Технический веб-сервер запущен на порту ${port}`);
});

// Сам код Майнкрафт-бота
function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingdomfemboys.mcsh.io',
    port: 25565,
    username: 'bot', // Замените на ваш ник!
    auth: 'offline',
    version: '1.21.4'
  });

  bot.on('spawn', () => {
    console.log('Бот успешно зашел на сервер!');
    // Защита от АФК кика: прыгаем на месте каждые 15 секунд
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 15000); 
  });

  bot.on('end', (reason) => {
    console.log(`Бот отключился: ${reason}. Перезапуск через 10 секунд...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Ошибка бота:', err));
}

createBot();

