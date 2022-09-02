const { Telegraf, Scenes, session, Markup } = require('telegraf');
const approve = new Scenes.BaseScene('approve');
const keyboard = require('../navigation/keyboard');

approve.enter((ctx) => {
    ctx.replyWithHTML(`<b>Проверьте, верно ли оформлен заказ:</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date}/${ctx.session.month} ${ctx.session.time}:00 \nСпособ оплаты: ${ctx.session.paymentMethod}`, keyboard.approve);
});

approve.action('accept', (ctx) => {
    // ctx.scene.enter('order');
    if (ctx.session.paymentMethod == 'Картой онлайн') {
        ctx.editMessageText('Оплатите заказ:', keyboard.payment);
    } 
    if (ctx.session.paymentMethod == 'Наличными') {
        ctx.scene.enter('order');
    }
});

approve.action('decline', (ctx) => {
    ctx.scene.enter('service');
});

module.exports = approve;