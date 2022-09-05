const { Telegraf, Scenes, session, Markup } = require('telegraf');
const approve = new Scenes.BaseScene('approve');
const keyboard = require('../navigation/keyboard');

approve.enter((ctx) => {
    ctx.replyWithHTML(`<b>Проверьте, верно ли оформлен заказ:</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.time} ${ctx.session.date} \nСпособ оплаты: ${ctx.session.paymentMethod} \nСтоимость: ${ctx.session.price}`, keyboard.approve);
});

approve.action('accept', (ctx) => {
    // ctx.scene.enter('order');
    if (ctx.session.paymentMethod == 'Картой онлайн') {
        ctx.editMessageText(`К оплате: ${ctx.session.price}р.`, keyboard.payment);
    } 
    if (ctx.session.paymentMethod == 'Наличными') {
        ctx.scene.enter('order');
    }
});

approve.action('decline', (ctx) => {
    ctx.scene.enter('service');
});

approve.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});



module.exports = approve;