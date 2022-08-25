const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('5579065634:AAGmWKhmdcYHTP8nmO6Ke6ZkYtIjLhjGdq4');

bot.command('123', (ctx) => {
    ctx.replyWithHTML('Оплатите товар:', Markup.inlineKeyboard([
        [
            Markup.button.callback('1000руб.', 'pay_1000'),
        ]
    ]));
});

bot.action('pay_1000', (ctx) => {
    console.log(ctx);
    return ctx.replyWithInvoice(getInvoice(ctx.from.id));
});

const getInvoice = (id) => {
    const invoice = {
      chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
      provider_token: '401643678:TEST:bce1ee57-ba07-435a-a0ec-a10bfd8f8e1d', // токен выданный через бот @SberbankPaymentBot 
      start_parameter: 'test', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
      title: 'Уборка квартиры', // Название продукта, 1-32 символа
      description: 'Уборка', // Описание продукта, 1-255 знаков
      currency: 'RUB', // Трехбуквенный код валюты ISO 4217
      prices: [{ label: 'Уборка квартиры', amount: 10000 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
      payload: '123'
    }
    
    return invoice
}
    
bot.on('pre_checkout_query', (ctx) => {
    console.log(ctx.update);
    ctx.answerPreCheckoutQuery(true)
}) // ответ на предварительный запрос по оплате

bot.on('successful_payment', async (ctx) => { // ответ в случае положительной оплаты
    console.log(ctx.update);
    await ctx.reply('SuccessfulPayment')
})

module.exports = bot;