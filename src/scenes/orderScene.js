const { Telegraf, Scenes } = require('telegraf');
const order = new Scenes.BaseScene('order');
const mongoose = require("mongoose");
const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
mongoose.connect(mongoDB);
const { Orders } = require('../databases/models.js')

order.enter(async (ctx) => {
    let order = new Orders({
        order_id: await Orders.countDocuments() + 1,
        chat_id: ctx.session.chat_id,
        service: ctx.session.service,
        name: ctx.session.name,
        phone: ctx.session.phone,
        address: ctx.session.address,
        date: new Date(2022, ctx.session.month - 1, ctx.session.date, ctx.session.time),
        price: ctx.session.price,
        payment_method: ctx.session.paymentMethod
    });
    
    let checkDate = await Orders.findOne({date: ctx.session.date});

    if (!checkDate) {
        ctx.replyWithHTML(`<b>Заказ оформлен</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date}/${ctx.session.month} ${ctx.session.time}:00 \n\nСтоимость заказа: <b>${ctx.session.price}</b>`);
    }
    else {
        ctx.reply(`${ctx.session.date} уже занято, выберите другую дату`).then(() => {
            ctx.scene.enter('greeting');
        });
        
    }

    await order.save();
});


module.exports = order;