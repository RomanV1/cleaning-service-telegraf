const { Telegraf, Scenes, session, Markup } = require('telegraf');
const service = new Scenes.BaseScene('service');

service.enter((ctx) => {
    ctx.editMessageText('Выберите услугу', keyboard.services);
});

service.action('main', (ctx) => {
    return ctx.scene.enter('greeting');
});

service.action('house_4000', (ctx) => {
    ctx.editMessageText('Стоимость уборки дома: 4000р', keyboard.house);
    ctx.session.service = 'Уборка дома'
    ctx.session.price = '4000р'
    return ctx.scene.enter('name');
});

service.action('apart_3000', (ctx) => {
    ctx.editMessageText(`Стоимость уборки квартиры: 3000р`, keyboard.apart);
    ctx.session.service = 'Уборка квартиры'
    ctx.session.price = '3000р'
    return ctx.scene.enter('name');
});

module.exports = service;