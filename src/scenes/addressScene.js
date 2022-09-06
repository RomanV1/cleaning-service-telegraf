const { Telegraf, Scenes, session, Markup } = require('telegraf');
const address = new Scenes.BaseScene('address');
const keyboard = require('../navigation/keyboard');

address.enter((ctx) => {
    ctx.reply('Введите адрес:', keyboard.HOME);
});

address.on('text', (ctx) => {
    ctx.session.address = ctx.message.text;
    ctx.scene.enter('date');
});

address.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});

address.on('message', (ctx) => {
    ctx.reply('Адрес некорректен, попробуйте еще раз.');
});


module.exports = address;