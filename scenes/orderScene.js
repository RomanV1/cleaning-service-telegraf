const { Telegraf, Scenes, session, Markup } = require('telegraf');
const order = new Scenes.BaseScene('order');
const mongoose = require("mongoose");
const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
mongoose.connect(mongoDB);
const Orders = require('../index.js')

order.enter((ctx) => {
    let order = new Orders({
        id: ctx.session.chat_id,
        service: ctx.session.service,
        name: ctx.session.name,
        phone: ctx.session.phone,
        address: ctx.session.address,
        date: new Date(2022, ctx.session.month - 1, ctx.session.date, ctx.session.time),
        price: ctx.session.price
    });
    
    Orders.findOne({date: ctx.session.date}).then((result) => {
        if (!result) {
            ctx.replyWithHTML(`<b>Заказ оформлен</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date}/${ctx.session.month} ${ctx.session.time}:00 \n\nСтоимость заказа: <b>${ctx.session.price}</b>`);

            order.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        else {
            ctx.reply(`${ctx.session.date} уже занято, выберите другую дату`).then(() => {
                ctx.scene.enter('greeting');
            })
            
        }
    });
});


module.exports = order;