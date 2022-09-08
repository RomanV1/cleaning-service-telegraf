import mongoose from "mongoose";

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

export { usersSchema, ordersSchema }