const { Telegraf, Scenes, session, Stage, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const { Users, Orders } = require('./databases/models');
const keyboard = require('./keyboard.js');
const { formatOrders } = require('./pagination.js')

const greeting = require('./scenes/greetingScene.js');
const service = require('./scenes/serviceScene.js');
const name = require('./scenes/nameScene.js');
const phone = require('./scenes/phoneScene.js');
const address = require('./scenes/addressScene.js');
const { month } = require('./scenes/dateScene.js');
const { date } = require('./scenes/dateScene.js');
const { time } = require('./scenes/dateScene.js');
const approve = require('./scenes/approveScene.js');
const order = require('./scenes/orderScene.js');
// const orders = require('./scenes/ordersScene.js');

const stage = new Scenes.Stage([greeting, service, name, phone, address, month, date, time, approve, order]);

bot.use(session());
bot.use(stage.middleware());

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

bot.action(/\page_/g, async (ctx) => {
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

// bot.command('orders', async (ctx) => {
//     let validRank = await Users.findOne({ id: ctx.message.chat.id, rank: 1});

//     if (validRank) { 
//         let orders = await Orders.find();

//         for (key in orders) {
//             let name = orders[key].name
//             let phone = orders[key].phone
//             let address = orders[key].address
//             let date = orders[key].date
    
//             ctx.reply(`Имя: ${name} \nТелефон: ${phone} \nАдрес: ${address} \nДата: ${date}`, Markup.inlineKeyboard(page_keyboard));
//         } 
        
//     }
//     else {
//         ctx.reply('Для использования этой команды недостаточно прав.')
//     }
// });

bot.on('message', async (ctx) => {
    ctx.reply('Неизвестная команда');

    let user = new Users({
        id: ctx.message.chat.id,
        name: ctx.message.chat.first_name,
        rank: 0
    });

    let checkUser = await Users.findOne({id: ctx.message.chat.id});

    if (!checkUser) { 
        await user.save() 
    }
});


bot.launch()
    .then(() => {
        console.log('\x1b[36m%s\x1b[0m', 'Running...');
    });
