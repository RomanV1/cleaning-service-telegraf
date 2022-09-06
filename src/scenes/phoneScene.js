const { Telegraf, Scenes, session, Markup } = require('telegraf');
const phone = new Scenes.BaseScene('phone');
const keyboard = require('../navigation/keyboard');

phone.enter((ctx) => {
    ctx.replyWithHTML('Введите номер телефона, начиная с <b>+7</b>:', keyboard.HOME)
});

phone.phone((ctx) => {
    ctx.session.phone = ctx.message.text
    ctx.scene.enter('address')
});

phone.on('message', (ctx) => {
    ctx.reply('Номер некорректен');
    ctx.scene.enter('phone');
});

phone.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});

module.exports = phone;