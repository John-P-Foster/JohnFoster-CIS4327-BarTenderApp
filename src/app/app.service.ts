/*.....................................................................................................................................................
Required external imports
.....................................................................................................................................................*/
    import { Injectable } from "@angular/core";
    import { HttpClient } from "@angular/common/http";
    import { Subject } from "rxjs";
    import {map} from "rxjs/operators"

/*.....................................................................................................................................................
Home Brewed imports
.....................................................................................................................................................*/
    import { Ingredient, Drink, Order } from "./app.models";

/*.....................................................................................................................................................
AppService Settings 
.....................................................................................................................................................*/

    @Injectable({providedIn: 'root'})

    export class AppService{
        private ingredients: Ingredient[] = [];
        private ingredientsUpdated = new Subject<Ingredient[]>();
        private drinks: Drink[] = [];
        private drinksUpdated = new Subject<Drink[]>();
        private orders: Order[] =[];
        private ordersUpdated = new Subject<Order[]>();

        constructor(private http: HttpClient){};

/*.....................................................................................................................................................
Getting items from the MongoDb
.....................................................................................................................................................*/
        //Getting the current Ingredients and updating subscriptions.
        getIngredients(){
            this.http.get<{message: string, ingredients: Ingredient[]}>('http://localhost:3000/api/ingredients')
            .pipe(map((ingredientData)=>{
                return ingredientData.ingredients.map(ingredient => {
                    return{
                        title: ingredient.title,
                        _id: ingredient._id
                    }
                })
            }))
            .subscribe((serverIngredients)=>{
                this.ingredients = serverIngredients;
                this.ingredientsUpdated.next([...this.ingredients]);
            });
        }
        getIngredientsUpdateListner(){
            return this.ingredientsUpdated.asObservable();
        }
        firstCallIngreients(){
            this.ingredientsUpdated.next([...this.ingredients]);
        }

        //Getting the current Drinks and updating subscriptions.
        getDrinks(){
            this.http.get<{message: string, drinks: Drink[]}>('http://localhost:3000/api/drinks')
            .pipe(map((drinkData)=>{
                return drinkData.drinks.map(drink => {
                    return{
                        _id: drink._id,
                        name: drink.name,
                        cost: drink.cost,
                        ingredients: drink.ingredients
                    }
                })
            }))
            .subscribe((serverDrinks)=>{
                this.drinks = serverDrinks;
                this.drinksUpdated.next([...this.drinks]);
            });
        }
        getDrinksUpdateListner(){
            return this.drinksUpdated.asObservable();
        }
        firstCallDrinks(){
            this.drinksUpdated.next([...this.drinks]);
        }
        
        //Getting the current Orders and updating subscriptions.
        getOrders(){
            this.http.get<{message: string, orders: Order[]}>('http://localhost:3000/api/orders')
            .pipe(map((orderData)=>{
                return orderData.orders.map(order => {
                    return{
                        _id: order._id,
                        drink: order.drink,
                        number: order.number,
                        time: order.time,
                        ready: order.ready
                    }
                })
            }))
            .subscribe((serverOrders)=>{
                this.orders = serverOrders;
                this.ordersUpdated.next([...this.orders]);
            });
        }
        getOrdersUpdateListner(){
            return this.ordersUpdated.asObservable();
        }
        firstCallOrders(){
            this.ordersUpdated.next([...this.orders]);
        }
        

/*.....................................................................................................................................................
Adding items to the MongoDb
.....................................................................................................................................................*/
            //Adding a new ingredient to the data base
            addIngredient(ingredient: Ingredient){
                this.http.post<{message: string, ingredientId: string}>('http://localhost:3000/api/ingredients', ingredient)
                .subscribe((responseData)=> {
                    console.log(responseData.message);
                    const id = responseData.ingredientId;
                    ingredient._id = id; 
                    this.ingredients.push(ingredient);
                    this.ingredientsUpdated.next([...this.ingredients]);
                })
            }

            //Adding a new drink to the data base
            addDrink(drink: Drink){
                this.http.post<{message: string, drinkId: string}>('http://localhost:3000/api/drinks', drink)
                .subscribe((responseData)=> {
                    console.log(responseData.message);
                    const id = responseData.drinkId;
                    drink._id = id; 
                    this.drinks.push(drink);
                    this.drinksUpdated.next([...this.drinks]);
                })
            }

            //Adding a new Order to the data base
            addOrder(order: Order){
                this.http.post<{message: string, orderId: string}>('http://localhost:3000/api/orders', order)
                .subscribe((responseData)=> {
                    console.log(responseData.message);
                    const id = responseData.orderId;
                    order._id = id; 
                    this.orders.push(order);
                    this.ordersUpdated.next([...this.orders]);
                })
            }

/*.....................................................................................................................................................
Editing items to the MongoDb
.....................................................................................................................................................*/
            //Editing ready status of an order
            updateOrderReadyStatus(orderId: string, orderReady: boolean) {
                console.log(orderId);
                this.http.put('http://localhost:3000/api/updateOrder/' + orderId, {ready: !orderReady}).subscribe(()=>{
                    this.getOrders();
                })
            }
/*.....................................................................................................................................................
Removing items from the MongoDb
.....................................................................................................................................................*/
            deleteOrder(orderId: string){
                console.log(orderId);
                this.http.delete('http://localhost:3000/api/orders/' + orderId)
                .subscribe(()=> {
                    const updatedOrders = this.orders.filter(order => order._id !== orderId);
                    this.orders = updatedOrders;
                    this.ordersUpdated.next([...this.orders]);
                    console.log("Order " + orderId + " deleted");
                })
                
            }

            deleteDrink(drinkId: string){
                console.log(drinkId);
                this.http.delete('http://localhost:3000/api/drinks/' + drinkId)
                .subscribe(()=> {
                    const updatedDrinks = this.drinks.filter(drink => drink._id !== drinkId);
                    this.drinks = updatedDrinks;
                    this.drinksUpdated.next([...this.drinks]);
                    console.log("Drink " + drinkId + " deleted");
                })
            }

            deleteIngredient(ingredientId: string){
                console.log(ingredientId);
                this.http.delete('http://localhost:3000/api/ingredients/' + ingredientId)
                .subscribe(()=> {
                    const updatedIngredients = this.ingredients.filter(ingredient => ingredient._id !== ingredientId);
                    this.ingredients = updatedIngredients;
                    this.ingredientsUpdated.next([...this.ingredients]);
                    console.log("Ingredient " + ingredientId + " deleted");
                })
            }
                
    }//End of AppService 

    