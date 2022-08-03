const { Markup } = require('telegraf')

keyboard = {
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
    approve: Markup.inlineKeyboard([
        [
            Markup.button.callback('✅', 'accept'),
            Markup.button.callback('❌', 'decline'),
        ]
    ]),

}

module.exports = keyboard