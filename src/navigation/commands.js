import { Users, Orders } from '../databases/models.js';
import { keyboard } from '../navigation/keyboard.js';

const commands = (bot) => {
    bot.command('start', async (ctx) => {
        ctx.scene.enter('greeting');
        ctx.session.chat_id = ctx.from.id;
    
        let user = new Users({
            id: ctx.from.id,
            name: ctx.from.first_name,
            rank: 0
        });
    
        let checkUser = await Users.findOne({id: ctx.from.id});
    
        if (!checkUser) { 
            await user.save();
        }
    });
    
    bot.command('about', (ctx) => {
        ctx.reply('Клининговая компания "Просто уборка" \n\nМы предоставляем свои услуги уже более 5 лет! \nНаши сотрудники лучшие на рынке.');
    });
    
    bot.command('orders', async (ctx) => {
        let validRank = await Users.findOne({ id: ctx.from.id, rank: 1});
    
        if (validRank) {
            let allOrders = await Orders.find();
            ctx.reply(`Общее кол-во заказов: ${allOrders.length}`, keyboard.ORDERS);
        } else {
            ctx.reply('Недостаточно прав')
        }
    });

    bot.on('message', async (ctx) => {
        ctx.replyWithHTML('Я вас не понимаю, попробуйте <b>/start</b>');
    
        let user = new Users({
            id: ctx.from.id,
            name: ctx.from.first_name,
            rank: 0
        });
    
        let checkUser = await Users.findOne({id: ctx.from.id});
    
        if (!checkUser) { 
            await user.save() 
        }
    });
}

export { commands }