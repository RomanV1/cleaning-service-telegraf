import { Scenes } from 'telegraf';
import { Users } from '../databases/models.js';
const orderNotify = new Scenes.BaseScene('orderNotify');

orderNotify.enter(async (ctx) => {
    let admins = await Users.find({rank: 1}, {id: 1});

    for (let key in admins) {
        ctx.telegram.sendMessage(admins[key].id, `Новый заказ! \n\nУслуга: ${ctx.session.service} \nИмя: ${ctx.session.name} \nТелефон: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.date} \nСпособ оплаты: ${ctx.session.paymentMethod} \nСтоимость: ${ctx.session.price}`);
    }
});

export { orderNotify };