const { Telegraf, Scenes, session, Markup } = require('telegraf');
const month = new Scenes.BaseScene('month');
const date = new Scenes.BaseScene('date');
const time = new Scenes.BaseScene('time');

month.enter((ctx) => {
    ctx.reply('Введите месяц: (Только цифру)')
});

month.on('text', (ctx) => {
    ctx.session.month = ctx.message.text;
    ctx.scene.enter('date');
});

date.enter((ctx) => {
    ctx.reply('Введите число: (Только цифру)')
});

date.on('text', (ctx) => {
    ctx.session.date = ctx.message.text;
    ctx.scene.enter('time');
});

time.enter((ctx) => {
    ctx.reply('Введите время: (Только час, например: 10)')
});

time.on('text', (ctx) => {
    ctx.session.time = ctx.message.text;
    ctx.scene.enter('paymentMethod');
});

module.exports = { month, date, time }