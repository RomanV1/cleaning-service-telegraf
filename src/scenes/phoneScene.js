import { Scenes } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const phone = new Scenes.BaseScene('phone');

phone.enter((ctx) => {
    ctx.replyWithHTML('Введите номер телефона, начиная с <b>+7</b>:', keyboard.HOME)
});

phone.phone((ctx) => {
    ctx.session.phone = ctx.message.text
    ctx.scene.enter('address')
});

phone.on('message', (ctx) => {
    ctx.reply('Номер некорректен');
    ctx.scene.enter('phone');
});

phone.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});

export { phone };