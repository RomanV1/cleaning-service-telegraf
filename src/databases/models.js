const mongoose = require("mongoose");
const mongoDB = `mongodb://root:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
const {usersSchema, ordersSchema } = require('./schemas');

const Users = mongoose.model('Users', usersSchema);

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = { Users, Orders };