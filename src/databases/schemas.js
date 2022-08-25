const mongoose = require("mongoose");
const mongoDB = 'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT';
mongoose.connect(mongoDB);
const db = mongoose.connection;


const usersSchema = new mongoose.Schema({
	id: Number, //{type: Number, unique: true, sparse: true},
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
    price: String,
});

module.exports = { usersSchema, ordersSchema }