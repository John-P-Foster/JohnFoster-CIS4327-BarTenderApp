const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true}
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient; 