const { Telegraf, Scenes, session, Stage, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const { Users } = require('./src/databases/models');

const { formatOrders, action } = require('./src/navigation/pagination');
const { commands } = require('./src/navigation/commands');
const { payment } = require('./src/scenes/payment');

const greeting = require('./src/scenes/greetingScene');
const service = require('./src/scenes/serviceScene');
const name = require('./src/scenes/nameScene');
const phone = require('./src/scenes/phoneScene');
const address = require('./src/scenes/addressScene');
const { date } = require('./src/scenes/dateScene');
const { time } = require('./src/scenes/dateScene');
const paymentMethod = require('./src/scenes/paymentMethodScene');
const approve = require('./src/scenes/approveScene');
const order = require('./src/scenes/orderScene');

const stage = new Scenes.Stage([greeting, service, name, phone, address, date, time, paymentMethod, approve, order]);

bot.use(session());
bot.use(stage.middleware());
bot.use(commands(bot));
bot.use(payment(bot));
bot.use(action(bot));
bot.use(formatOrders);

bot.on('text', async (ctx) => {
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
        console.log('\x1b[34m%s\x1b[0m', 'Running...');
    });
