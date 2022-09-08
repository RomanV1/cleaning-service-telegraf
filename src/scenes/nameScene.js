import { Scenes } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const name = new Scenes.BaseScene('name');

name.action('order', (ctx) => {
    ctx.editMessageText('Введите имя:', keyboard.HOME);
});

name.on('text', (ctx) => {
    ctx.session.name = ctx.message.text;
    ctx.scene.enter('phone');
});

name.on('message', (ctx) => {
    ctx.reply('Некорректное имя, попробуйте снова:', keyboard.HOME);
});

name.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});

export { name };
