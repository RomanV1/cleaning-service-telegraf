const { Markup } = require('telegraf');
const { button } = require('./buttons');

const keyboard = {
    GREETING: Markup.inlineKeyboard([
        [
            button.SERVICES
        ],
        [
            button.ABOUT
        ]
    ]),
    SERVICES: Markup.inlineKeyboard([
        [
            button.HOUSE,
            button.APART
        ],
        [
            button.HOME
        ]
    ]),
    HOUSE: Markup.inlineKeyboard([
        [
            button.ORDER,
            button.HOME
        ]
    ]),
    APART: Markup.inlineKeyboard([
        [
            button.HOUSE,
            button.HOME
        ]
    ]),
    PAYMENT_METHOD: Markup.inlineKeyboard([
        [
            button.CASH,
            button.CARD
        ],
        [
            button.HOME
        ]
    ]),
    PAYMENT: Markup.inlineKeyboard([
        [
            button.PAY
        ]
    ]),
    APPROVE: Markup.inlineKeyboard([
        [
            button.ACCEPT,
            button.DECLINE
        ],
        [
            button.HOME
        ]
    ]),
    ORDERS: Markup.inlineKeyboard([
        [
            button.ORDERS
        ]
    ]),
    HOME: Markup.inlineKeyboard([
        [
            button.HOME
        ]
    ]),
}

module.exports = keyboard