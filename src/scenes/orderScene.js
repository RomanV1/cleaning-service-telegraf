const { Telegraf, Scenes } = require('telegraf');
const order = new Scenes.BaseScene('order');
const mongoose = require("mongoose");
const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
mongoose.connect(mongoDB);
const { Orders } = require('../databases/models.js');

order.enter(async (ctx) => {
    let order = new Orders({
        order_id: await Orders.countDocuments() + 1,
        chat_id: ctx.session.chat_id,
        service: ctx.session.service,
        name: ctx.session.name,
        phone: ctx.session.phone,
        address: ctx.session.address,
        // date: new Date(2022, ctx.session.month - 1, ctx.session.date, ctx.session.time),
        date: `${ctx.session.time} ${ctx.session.date}`,
        price: ctx.session.price,
        payment_method: ctx.session.paymentMethod
    });
    
    ctx.replyWithHTML(`<b>Заказ оформлен</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.time} ${ctx.session.date} \n\nСтоимость заказа: <b>${ctx.session.price}</b>`);

    await order.save();
});


module.exports = order;