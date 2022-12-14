import { Scenes, Markup } from 'telegraf';
import { keyboard } from '../navigation/keyboard.js';
const greeting = new Scenes.BaseScene('greeting');

greeting.enter((ctx) => {
    ctx.reply('Здравствуйте, мы предоставляем клининговые услуги', keyboard.GREETING); 
});

greeting.action('services', (ctx) => {
    ctx.scene.enter('service');
});

greeting.action('about', (ctx) => {
    ctx.editMessageText('Клининговая компания "Просто уборка" \n\nМы предоставляем свои услуги уже более 5 лет! \nНаши сотрудники лучшие на рынке.', Markup.inlineKeyboard([
        [
            Markup.button.callback('Выбрать услугу', 'services'),
        ]
    ]));
});

export { greeting };
