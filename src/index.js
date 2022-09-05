const { Telegraf, Scenes, session, Stage, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');
const { Users } = require('./databases/models');

const { formatOrders, action } = require('./navigation/pagination');
const { commands } = require('./navigation/commands');
const { payment } = require('./scenes/payment');

const greeting = require('./scenes/greetingScene');
const service = require('./scenes/serviceScene');
const name = require('./scenes/nameScene');
const phone = require('./scenes/phoneScene');
const address = require('./scenes/addressScene');
const { date, time } = require('./scenes/dateScene');
const paymentMethod = require('./scenes/paymentMethodScene');
const approve = require('./scenes/approveScene');
const order = require('./scenes/orderScene');
const orderNotify = require('./scenes/orderNotificationScene');

const stage = new Scenes.Stage([greeting, service, name, phone, address, date, time, paymentMethod, approve, order, orderNotify]);

bot.use(session());
bot.use(stage.middleware());
bot.use(payment(bot));

commands(bot);
action(bot);
formatOrders();

bot.launch()
    .then(() => {
        console.log('\x1b[34m%s\x1b[0m', 'Running...');
    });