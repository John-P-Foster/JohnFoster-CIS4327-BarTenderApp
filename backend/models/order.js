const mongoose = require('mongoose');
const Drink = require('./drink');

const orderSchema = mongoose.Schema({
    _id: {type: String, required: true},
    drink: [{type: mongoose.Schema.Types.ObjectId, ref:'Drink'}],
    number: {type: Number},
    time: {type: Date},
    ready: {type: Boolean}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 