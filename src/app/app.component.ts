/*.....................................................................................................................................................
Required external imports
.....................................................................................................................................................*/
  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';

/*.....................................................................................................................................................
Required Home Brewed imports
.....................................................................................................................................................*/
  import { MenuComponent } from './menu/menu.component';
  import { OrdersComponent } from './orders/orders.component';
  import { NewDrinkComponent } from './menu/new-drink/new-drink.component';
  import { NewIngredientComponent } from './ingredients/new-ingredient/new-ingredient.component';


/*.....................................................................................................................................................
AppComponent Settings 
.....................................................................................................................................................*/
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      RouterOutlet,
      MenuComponent, 
      OrdersComponent, 
      NewDrinkComponent,
      NewIngredientComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', './shared/site-standard.css']
  })

/*.....................................................................................................................................................
Exporting the AppComponent
.....................................................................................................................................................*/
  export class AppComponent {
    title = 'bartender-app';
    isViewingMenu = false;
    adminIsViewingMenu = false;
    isViewingOrders = false;
    isViewingAddNewDrink = false;
    isViewingAddNewIngredient = false;

    //Displays / Hides current drink menu to the user
    onMenuAction(e : boolean, admin: boolean){
      this.isViewingMenu = e;
      this.adminIsViewingMenu = admin;
    }
    
    //Displays / Hides current orders and their status to the user
    viewingOrders(e : boolean){
      this.isViewingOrders = e; 
    }

    //Displays / Hides dialog for adding a new Drink. 
    addingNewDrink(e : boolean){
      this.isViewingAddNewDrink = e;
      if(!e){
        this.viewingOrders(true);
      }
    }

    //Displays / Hides dialog for adding a new Ingredient
    addingNewIngredient(e : boolean){
      this.isViewingAddNewIngredient = e;
      if(!e){
        this.addingNewDrink(true);
      }
    }

  }
