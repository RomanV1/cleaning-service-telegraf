const { Telegraf, Scenes, session, Markup } = require('telegraf');
const { Users, Orders } = require('../databases/models');
const orderNotify = new Scenes.BaseScene('orderNotify');
const keyboard = require('../navigation/keyboard');

orderNotify.enter(async (ctx) => {
    let admins = await Users.find({rank: 1}, {id: 1});

    for (key in admins) {
        ctx.telegram.sendMessage(admins[key].id, `Новый заказ! \n\nУслуга: ${ctx.session.service} \nИмя: ${ctx.session.name} \nТелефон: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date} \nСпособ оплаты: ${ctx.session.paymentMethod} \nСтоимость: ${ctx.session.price}`);
    }
});

orderNotify.on('message', (ctx) => {
    ctx.replyWithHTML('Я вас не понимаю, попробуйте <b>/start</b>');
})

module.exports = orderNotify;