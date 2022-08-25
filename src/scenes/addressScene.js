const { Telegraf, Scenes, session, Markup } = require('telegraf');
const address = new Scenes.BaseScene('address');

address.enter((ctx) => {
    ctx.reply('Введите адрес:');
});

address.on('text', (ctx) => {
    ctx.session.address = ctx.message.text;
    return ctx.scene.enter('month');
});

module.exports = address;