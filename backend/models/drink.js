const mongoose = require('mongoose');
const Ingredient = require('./ingredient');

const drinkSchema = mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    cost: {type: Number},
    ingredients:[{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}] // Array of Ingredient references
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink; 