import dotenv from 'dotenv'
dotenv.config();

import { Telegraf, Scenes, session } from 'telegraf';
const bot = new Telegraf(process.env.BOT_TOKEN);

import { formatOrders, action } from './navigation/pagination.js';
import { commands } from'./navigation/commands.js';
import { payment } from './scenes/payment.js';

import { greeting } from './scenes/greetingScene.js';
import { service } from './scenes/serviceScene.js';
import { name } from './scenes/nameScene.js';
import { phone } from './scenes/phoneScene.js';
import { address } from './scenes/addressScene.js';
import { date, time } from './scenes/dateScene.js';
import { paymentMethod } from './scenes/paymentMethodScene.js';
import { approve } from './scenes/approveScene.js';
import { order } from './scenes/orderScene.js';
import { orderNotify } from './scenes/orderNotificationScene.js';

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