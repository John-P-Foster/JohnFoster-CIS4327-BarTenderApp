/*.....................................................................................................................................................
Required external imports
.....................................................................................................................................................*/
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const cors = require('cors');

/*.....................................................................................................................................................
Home brewed Imports section
.....................................................................................................................................................*/
    const Ingredient = require('./models/ingredient');
    const Drink = require('./models/drink');
    const Order = require('./models/order');

/*.....................................................................................................................................................
Astablishing connection to data base
.....................................................................................................................................................*/
    //This data is being saved in the mongoDB on atlas called ................................|bartenderApp|
    mongoose.connect('mongodb+srv://johnpetefoster:rg2DUu9me8R6CDyr@cluster0.bfdj5.mongodb.net/bartenderApp?retryWrites=true&w=majority&appName=Cluster0')
        .then(()=>{
            console.log('Connected to Bartender App Data base!')
        })
        .catch(()=>{
            console.log('Failed to connect to Bartender App Data base!')
        });

/*.....................................................................................................................................................
Setting up the express app to accept http traffic
.....................................................................................................................................................*/
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    //setting headers to avoid cors restrictions. 
    app.use((req, res, next)=>{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, PUT")
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT")
        next();
    });


/*.....................................................................................................................................................
HTML POST options for application
.....................................................................................................................................................*/
    //Route to add a new ingredient to the data base. 
    app.post("/api/ingredients", (req, res, next)=>{
        const ingredient = new Ingredient({
            _id: new mongoose.Types.ObjectId().toString(),
            title: req.body.title
        });
        ingredient.save()
            .then(addedIngredient => {
                res.status(201).json({
                    message: `${ingredient.title} added successfully`,
                    ingredientId: addedIngredient._id
                })
            }); 
    });

    //Route to add a new drink to the data base
    app.post("/api/drinks", (req, res, next)=>{
        const drink = new Drink({
            _id: new mongoose.Types.ObjectId().toString(),
            name: req.body.name,
            cost: req.body.cost,
            ingredients: req.body.ingredients
        });
        drink.save().then(addedDrink => {
            res.status(201).json({
                message: `${drink.name} added successfully`,
                drinkId: addedDrink._id
            })
        }); 
    });

    //Route to add a new order to the data base
    app.post("/api/orders", (req, res, next)=>{
        const order = new Order({
            _id: new mongoose.Types.ObjectId().toString(),
            drink: req.body.drink,
            number: req.body.number,
            time: req.body.time,
            ready: false
        });
        order.save().then(addedOrder => {
            res.status(201).json({
                message: 'Order added successfully',
                orderId: addedOrder._id
            })
        }); 
    });

/*.....................................................................................................................................................
HTML GET options
.....................................................................................................................................................*/
    // Rout to get ingredients from the data base
    app.get("/api/ingredients", (req,res,next)=> {
        Ingredient.find().then(ingredients => {
            res.status(200).json({
                message: 'Ingredients list fetched successfully!',
                ingredients: ingredients
            });
        });
    });

    //Route to get drinks from the data base
    app.get("/api/drinks", (req,res,next)=> {
        Drink.find()
        .populate('ingredients')
        .then(drinks => {
            res.status(200).json({
                message: 'Drinks list fetched successfully!',
                drinks: drinks
            });
        });
    });

    //Route to get orders from the data base
    app.get("/api/orders", (req,res,next)=> {
        Order.find()
        .populate('drink')
        .then(orders => {
            res.status(200).json({
                message: 'Orders fetched successfully!',
                orders: orders
            });
        });
    });

/*.....................................................................................................................................................
HTML DELET options
.....................................................................................................................................................*/
    //Route to delete an ingredient    
    app.delete("/api/ingredients/:id", (req, res, next) =>{
        Ingredient.deleteOne({_id: req.params.id}).then(result =>{
            console.log(result);
            res.status(200).json({message: "Ingredient deleted!"});
        })
    });

    //Route to delete a drink
    app.delete("/api/drinks/:id", (req, res, next) =>{
        Drink.deleteOne({_id: req.params.id}).then(result =>{
            console.log(result);
            res.status(200).json({message: "Drink deleted!"});
        })
    });

    //Route to delete an order
    app.delete("/api/orders/:id", (req, res, next) =>{
        Order.deleteOne({_id: req.params.id}).then(result =>{
            console.log(result);
            res.status(200).json({message: "Order deleted!"});
        })
    });

/*.....................................................................................................................................................
HTML PUT options
.....................................................................................................................................................*/
    // Route to update the order's ready status
    app.put("/api/updateOrder/:id", (req, res, next) => {        
        const orderId = req.params.id;
        const updatedReadyStatus = req.body.ready;
        
        Order.findByIdAndUpdate(orderId, { ready: updatedReadyStatus }, { new: true })
            .then(updatedOrder => {
                if (!updatedOrder) {
                    return res.status(404).json({ message: 'Order not found!' });
                }
                res.status(200).json({
                    message: 'Order updated successfully!',
                    order: updatedOrder
                });
            })
            .catch(error => {
                console.error("Error updating order:", error);
                res.status(500).json({
                    message: 'Failed to update the order!',
                    error: error
                });
            });
    });
/*.....................................................................................................................................................
Exporting the final app
.....................................................................................................................................................*/
    module.exports = app;