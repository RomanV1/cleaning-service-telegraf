import { Scenes } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const date = new Scenes.BaseScene('date');
const time = new Scenes.BaseScene('time');

date.enter((ctx) => {
    ctx.reply('Введите число и месяц через пробел: (Пример: 12 января)', keyboard.home);
});

date.on('text', (ctx) => {
    ctx.session.date = ctx.message.text;
    ctx.scene.enter('time');
});

date.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});


time.enter((ctx) => {
    ctx.reply('Введите время через двоиточие: (Пример: 12:30)', keyboard.HOME);
});

time.on('text', (ctx) => {
    ctx.session.time = ctx.message.text;
    ctx.scene.enter('paymentMethod');
});

time.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});


export { date, time }