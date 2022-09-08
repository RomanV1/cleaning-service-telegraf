import { Scenes } from 'telegraf';
import { Orders } from '../databases/models.js';
const order = new Scenes.BaseScene('order');

order.enter(async (ctx) => {
    let order = new Orders({
        order_id: await Orders.countDocuments() + 1,
        chat_id: ctx.session.chat_id,
        service: ctx.session.service,
        name: ctx.session.name,
        phone: ctx.session.phone,
        address: ctx.session.address,
        date: `${ctx.session.time} ${ctx.session.date}`,
        price: ctx.session.price,
        payment_method: ctx.session.paymentMethod
    });
    
    ctx.replyWithHTML(`<b>Заказ оформлен</b> \n\nИмя: ${ctx.session.name} \nНомер телефона: ${ctx.session.phone} \nАдрес: ${ctx.session.address} \nДата: ${ctx.session.time} ${ctx.session.date} \n\nСтоимость заказа: <b>${ctx.session.price}</b>`);
    ctx.scene.enter('orderNotify');

    await order.save();
});


export { order };