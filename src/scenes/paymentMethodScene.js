const { Telegraf, Scenes, session, Markup } = require('telegraf');
const paymentMethod = new Scenes.BaseScene('paymentMethod');
const keyboard = require('../navigation/keyboard');

paymentMethod.enter((ctx) => {
    ctx.reply('Выберите способ оплаты:', keyboard.paymentMethod);
});

paymentMethod.action('cash', (ctx) => {
    ctx.session.paymentMethod = 'Наличными';
    ctx.scene.enter('approve');
});

paymentMethod.action('card', (ctx) => {
    ctx.session.paymentMethod = 'Картой онлайн';
    ctx.scene.enter('approve');
});

module.exports = paymentMethod;