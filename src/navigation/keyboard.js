const { Markup } = require('telegraf');

const keyboard = {
    main: Markup.inlineKeyboard([
        [
            Markup.button.callback('Выбрать услугу', 'services'),
        ],
        [
            Markup.button.callback('О нас', 'about')
        ]
    ]),
    services: Markup.inlineKeyboard([
        [
            Markup.button.callback('Уборка дома', 'house_4000'),
            Markup.button.callback('Уборка квартиры', 'apart_3000'),
        ],
        [
            Markup.button.callback('На главную', 'main')
        ]
    ]),
    house: Markup.inlineKeyboard([
        [
            Markup.button.callback('Оформить заказ', 'order'),
            Markup.button.callback('На главную', 'main'),
        ]
    ]),
    apart: Markup.inlineKeyboard([
        [
            Markup.button.callback('Оформить заказ', 'order'),
            Markup.button.callback('На главную', 'main'),
        ]
    ]),
    paymentMethod: Markup.inlineKeyboard([
        [
            Markup.button.callback('Наличными', 'cash'),
            Markup.button.callback('Картой онлайн', 'card'),
        ]
    ]),
    payment: Markup.inlineKeyboard([
        [
            Markup.button.callback('Оплатить', 'pay'),
        ]
    ]),
    approve: Markup.inlineKeyboard([
        [
            Markup.button.callback('✅', 'accept'),
            Markup.button.callback('❌', 'decline'),
        ]
    ]),
    orders: Markup.inlineKeyboard([
        [
            Markup.button.callback('Показать заказы', 'page_0'),
        ]
    ]),
    home: Markup.inlineKeyboard([
        [
            Markup.button.callback('На главную', 'home'),
        ]
    ]),
}

module.exports = keyboard