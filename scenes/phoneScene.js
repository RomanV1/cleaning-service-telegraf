const { Telegraf, Scenes, session, Markup } = require('telegraf');
const phone = new Scenes.BaseScene('phone');

phone.enter((ctx) => {
    ctx.replyWithHTML('Введите номер телефона, начиная с <b>+7</b>:')
});

phone.phone((ctx) => {
    ctx.session.phone = ctx.message.text
    return ctx.scene.enter('address')
});

phone.on('message', (ctx) => {
    ctx.reply('Номер некорректен');
    return ctx.scene.enter('phone');
});

module.exports = phone;