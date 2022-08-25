const { Telegraf, Scenes, session, Stage, Markup } = require('telegraf');
const { Users, Orders } = require('../databases/models');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const keyboard = require('../navigation/keyboard');

bot.command('start', async (ctx) => {
    ctx.scene.enter('greeting');
    ctx.session.chat_id = ctx.message.chat.id;

    let user = new Users({
        id: ctx.message.chat.id,
        name: ctx.message.chat.first_name,
        rank: 0
    });

    let checkUser = await Users.findOne({id: ctx.message.chat.id});

    if (!checkUser) { 
        await user.save();
    }
});

bot.command('about', (ctx) => {
    ctx.reply('Клининговая компания "Просто уборка" \n\nМы предоставляем свои услуги уже более 5 лет! \nНаши сотрудники лучшие на рынке.');
});

bot.command('orders', async (ctx) => {
    let validRank = await Users.findOne({ id: ctx.message.chat.id, rank: 1});

    if (validRank) {
        let allOrders = await Orders.find();
        ctx.reply(`Общее кол-во заказов: ${allOrders.length}`, keyboard.orders);
    } else {
        ctx.reply('Недостаточно прав')
    }
});

module.exports = bot