// const { Telegraf, Scenes, session, Markup } = require('telegraf');
// const orders = new Scenes.BaseScene('orders');
// const mongoose = require("mongoose");
// const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
// mongoose.connect(mongoDB);
// const { Orders } = require('../databases/models.js');
// const { formatOrders } = require('../pagination.js');

// const page_keyboard = [
//     [
//         Markup.button.callback('На главную', 'main'),
//     ]
// ]

// orders.enter(async (ctx) => {
//     let allOrders = await Orders.find();
//     ctx.reply(`Общее кол-во заказов: ${allOrders.length}`, keyboard.orders);
// });

// orders.action(/\page_/g, async (ctx) => {
//     let allOrders = await Orders.find();
//     let page_id = Number(ctx.update.callback_query.data.split('_')[1]);

//     if (page_id > 0) {
//         page_keyboard[0].push(Markup.button.callback('back', `page_${page_id - 1}`));
//     }
//     if (page_id < allOrders.length - 1) {
//         page_keyboard[0].push(Markup.button.callback('next', `page_${page_id + 1}`));
//     }

//     ctx.editMessageText(await formatOrders(page_id, page_id + 1), Markup.inlineKeyboard(page_keyboard));

// });

// module.exports = orders