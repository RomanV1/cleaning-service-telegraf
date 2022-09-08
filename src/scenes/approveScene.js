import { Scenes } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const approve = new Scenes.BaseScene('approve');

approve.enter((ctx) => {
    ctx.replyWithHTML(`<b>Проверьте, верно ли оформлен заказ:</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.time} ${ctx.session.date} \nСпособ оплаты: ${ctx.session.paymentMethod} \nСтоимость: ${ctx.session.price}`, keyboard.APPROVE);
});

approve.action('accept', (ctx) => {
    if (ctx.session.paymentMethod == 'Картой онлайн') {
        ctx.editMessageText(`К оплате: ${ctx.session.price}р.`, keyboard.PAYMENT);
    } 
    if (ctx.session.paymentMethod == 'Наличными') {
        ctx.scene.enter('order');
    }
});

approve.action('decline', (ctx) => {
    ctx.scene.enter('service');
});

approve.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});



export { approve };