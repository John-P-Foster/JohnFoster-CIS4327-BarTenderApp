const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app'); // Assuming app.js is in the same directory
const Ingredient = require('./models/ingredient');
const Drink = require('./models/drink');
const Order = require('./models/order');

describe('POST /api', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/bartenderApp?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test for /api/ingredients
    it('should add a new ingredient', async () => {
        const response = await request(app)
            .post('/api/ingredients')
            .send({
                title: 'Lemon'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Lemon added successfully');
    });

    // Test for /api/drinks
    it('should add a new drink', async () => {
        const ingredient = new Ingredient({
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'Sugar'
        });
        await ingredient.save();

        const response = await request(app)
            .post('/api/drinks')
            .send({
                name: 'Lemonade',
                cost: 5.99,
                ingredients: [ingredient._id]
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Lemonade added successfully');
    });

    // Test for /api/orders
    it('should add a new order', async () => {
        const drink = new Drink({
            _id: new mongoose.Types.ObjectId().toString(),
            name: 'Lemonade',
            cost: 5.99,
            ingredients: []
        });
        await drink.save();

        const response = await request(app)
            .post('/api/orders')
            .send({
                drink: drink._id,
                number: 2,
                time: new Date().toISOString(),
                ready: false
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Order added successfully');
    });
});