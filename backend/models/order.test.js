const mongoose = require('mongoose');
const Drink = require('./drink'); // Assuming you have the drink model in a separate file
const Order = require('./order'); // Assuming you have the order model in a separate file

describe('Order and Drink Models', () => {
    // Before all tests, connect to the test database
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/bartenderApp?retryWrites=true&w=majority&appName=Cluster0');
    });

    // After all tests, close the database connection
    afterAll(async () => {
        await mongoose.connection.close('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/bartenderApp?retryWrites=true&w=majority&appName=Cluster0');
    });

    // A test to add a drink to an order and output it
    it('should create an order with a drink and output it', async () => {
        // Step 1: Create a new Drink
        const newDrink = new Drink({
            _id: new mongoose.Types.ObjectId().toString(),
            name: 'Lemonade',
            ingredients: [],
        });

        await newDrink.save();

        // Step 2: Create a new Order with the Drink
        const newOrder = new Order({
            _id: new mongoose.Types.ObjectId().toString(),
            drink: newDrink._id, // Reference the Drink by its ID
            number: 1,
            time: new Date(),
            order: false
        });

        await newOrder.save();

        // Step 3: Retrieve the Order and populate the Drink details
        const orderWithDrink = await Order.findById(newOrder._id).populate('drink').exec();

        // Output the order details to the console
        console.log(orderWithDrink);

        // Assertions (optional, but good for testing)
        expect(orderWithDrink.drink.name).toBe('Lemonade');
        expect(orderWithDrink.number).toBe(1);
    });
});
