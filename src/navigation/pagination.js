const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const { Orders } = require('../databases/models');

const formatOrders = async (offset, limit) => {
    let allOrders = await Orders.find();
    let order_result = allOrders.splice(offset, limit);
    let result = '';
    for (key in order_result) {
        let name = order_result[key].name
        let phone = order_result[key].phone
        let address = order_result[key].address
        let date = order_result[key].date

        result = `Имя: ${name} \nТелефон: ${phone} \nАдрес: ${address} \nДата: ${date}`;
    }

    return result;
}

bot.action(/page_/g, async (ctx) => {
    const page_keyboard = [
        [],
        [
            Markup.button.callback('На главную', 'main'),
        ]
    ]

    let allOrders = await Orders.find();
    let page_id = Number(ctx.update.callback_query.data.split('_')[1]);

    if (page_id > 0) {
        page_keyboard[0].push(Markup.button.callback('⬅️', `page_${page_id - 1}`));
    }
    if (page_id < allOrders.length - 1) {
        page_keyboard[0].push(Markup.button.callback('➡️', `page_${page_id + 1}`));
    }

    ctx.editMessageText(await formatOrders(page_id, 1), Markup.inlineKeyboard(page_keyboard));
});

bot.action('main', (ctx) => {
    ctx.scene.enter('greeting');
})


module.exports = {formatOrders, bot};




