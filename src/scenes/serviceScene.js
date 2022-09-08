import { Scenes } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const service = new Scenes.BaseScene('service');

service.enter((ctx) => {
    ctx.editMessageText('Выберите услугу', keyboard.SERVICES);
});

service.action('home', (ctx) => {
    ctx.scene.enter('greeting');
});

service.action('house_4000', (ctx) => {
    ctx.editMessageText(`Стоимость уборки дома: 4000р`, keyboard.HOUSE);
    ctx.session.service = 'Уборка дома'
    ctx.session.price = 4000

    ctx.scene.enter('name');
});

service.action('apart_3000', (ctx) => {
    ctx.editMessageText(`Стоимость уборки квартиры: 3000р`, keyboard.APART);
    ctx.session.service = 'Уборка квартиры'
    ctx.session.price = 3000
    
    ctx.scene.enter('name');
});

export { service };