const { Markup } = require('telegraf');

const button = {
    HOME: Markup.button.callback('На главную', 'home'),
    SERVICES: Markup.button.callback('Выбрать услугу', 'services'),
    ABOUT: Markup.button.callback('О нас', 'about'),
    HOUSE: Markup.button.callback('Уборка дома', 'house_4000'),
    APART: Markup.button.callback('Уборка квартиры', 'apart_3000'),
    ORDER: Markup.button.callback('Оформить заказ', 'order'),
    CASH: Markup.button.callback('Наличными', 'cash'),
    CARD: Markup.button.callback('Картой онлайн', 'card'),
    PAY: Markup.button.callback('Оплатить', 'pay'),
    ACCEPT: Markup.button.callback('✅', 'accept'),
    DECLINE: Markup.button.callback('❌', 'decline'),
    ORDERS: Markup.button.callback('Показать заказы', 'page_0'),

}

module.exports = { button } 