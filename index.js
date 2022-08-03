const keyboard = require('./keyboard.js');
const { Telegraf, Scenes, session, Stage, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const mongoose = require("mongoose");
const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
mongoose.connect(mongoDB);
const db = mongoose.connection;



const Users = mongoose.model('Users', new mongoose.Schema({
	id: Number, //{type: Number, unique: true, sparse: true},
    name: String,
	rank: Number
}));

const Orders = mongoose.model('Orders', new mongoose.Schema({
    id: Number,
    service: String,
    name: String,
    phone: String,
    address: String,
    date: String,
    price: String
}));


bot.telegram.setMyCommands([
    {command: '/start', description: 'Начать'},
    {command: '/about', description: 'О нас'},
]);

const greeting = require('./scenes/greetingScene.js');
const service = require('./scenes/serviceScene.js');
const name = require('./scenes/nameScene.js');
const phone = require('./scenes/phoneScene.js');
const address = require('./scenes/addressScene.js');
const { month } = require('./scenes/dateScene.js');
const { date } = require('./scenes/dateScene.js');
const { time } = require('./scenes/dateScene.js');
const approve = require('./scenes/approveScene.js');
const { use } = require('./scenes/greetingScene.js');
const order = new Scenes.BaseScene('order');
// const order = require('./scenes/orderScene.js');

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
        const orders = await Orders.find();

        for (key in orders) {
            let name = orders[key].name
            let phone = orders[key].phone
            let address = orders[key].address
            let month = orders[key].month
            let date = orders[key].date
            let time = orders[key].time
    
            ctx.reply(`Имя: ${name} \nТелефон: ${phone} \nАдрес: ${address} \nДата: ${date}`);
        } 
        
    }
    else {
        ctx.reply('Для использования этой команды недостаточно прав.')
    }
});

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

order.enter(async (ctx) => {
    let order = new Orders({
        id: ctx.session.chat_id,
        service: ctx.session.service,
        name: ctx.session.name,
        phone: ctx.session.phone,
        address: ctx.session.address,
        date: new Date(2022, ctx.session.month - 1, ctx.session.date, ctx.session.time),
        price: ctx.session.price
    });
    
    let checkDate = await Orders.findOne({date: ctx.session.date});

    if (!checkDate) {
        ctx.replyWithHTML(`<b>Заказ оформлен</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date}/${ctx.session.month} ${ctx.session.time}:00 \n\nСтоимость заказа: <b>${ctx.session.price}</b>`);
    }
    else {
        ctx.reply(`${ctx.session.date} уже занято, выберите другую дату`).then(() => {
            ctx.scene.enter('greeting');
        })
        
    }

    await order.save();
});

bot.launch()
    .then(() => {
        console.log('Running...');
    });


module.exports = Orders
