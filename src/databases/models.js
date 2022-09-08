import dotenv from 'dotenv'
dotenv.config();

import mongoose from "mongoose"
import { usersSchema, ordersSchema } from './schemas.js';
const mongoDB = `mongodb://root:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?authMechanism=DEFAULT`;
mongoose.connect(mongoDB);

const Users = mongoose.model('Users', usersSchema);

const Orders = mongoose.model('Orders', ordersSchema);

export { Users, Orders };