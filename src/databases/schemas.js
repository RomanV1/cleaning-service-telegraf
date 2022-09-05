const mongoose = require("mongoose");
const mongoDB = `mongodb://root:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;
mongoose.connect(mongoDB);
const db = mongoose.connection;


const usersSchema = new mongoose.Schema({
	id: Number,
    name: String,
	rank: Number,
});

const ordersSchema = new mongoose.Schema({
    order_id: Number,
    chat_id: Number,
    service: String,
    name: String,
    phone: String,
    address: String,
    date: String,
    price: Number,
    payment_method: String,
});

module.exports = { usersSchema, ordersSchema }