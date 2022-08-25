const { Telegraf, Scenes, session, Markup } = require('telegraf');
const approve = new Scenes.BaseScene('approve');
const keyboard = require('../navigation/keyboard');

approve.enter((ctx) => {
    ctx.replyWithHTML(`<b>Проверьте, верно ли оформлен заказ:</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date}/${ctx.session.month} ${ctx.session.time}:00`, keyboard.approve);
});

approve.action('accept', (ctx) => {
    ctx.scene.enter('order');
});

approve.action('decline', (ctx) => {
    ctx.scene.enter('service');
});

module.exports = approve;