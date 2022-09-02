const { Telegraf, Scenes, session, Markup } = require('telegraf');
const address = new Scenes.BaseScene('address');
const keyboard = require('../navigation/keyboard');

address.enter((ctx) => {
    ctx.reply('Введите адрес:', keyboard.home);
});

address.on('text', (ctx) => {
    ctx.session.address = ctx.message.text;
    ctx.scene.enter('date');
});

address.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});


module.exports = address;