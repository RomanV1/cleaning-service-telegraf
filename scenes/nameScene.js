const { Telegraf, Scenes, session, Markup } = require('telegraf');
const name = new Scenes.BaseScene('name');

name.action('order', (ctx) => {
    ctx.editMessageText('Введите имя:');
});

name.on('text', (ctx) => {
    ctx.session.name = ctx.message.text;
    return ctx.scene.enter('phone');
});

module.exports = name;
