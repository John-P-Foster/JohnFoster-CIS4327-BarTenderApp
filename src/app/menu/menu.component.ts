import { Component, Output, EventEmitter, inject, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { CustomDialogComponent } from '../shared/custom-dialog/custom-dialog.component';
import { Drink, Order } from '../app.models';
import { DrinkComponent } from './drink/drink.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CustomDialogComponent, FormsModule, DrinkComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../shared/site-standard.css'
  ]
})
export class MenuComponent {
  @Output() close = new EventEmitter();
  @Output() isAddingNewDrink = new EventEmitter();
  @Input({required: true}) admin!: boolean;

  private appService = inject(AppService);
  private drinksSub!: Subscription;
  
  drinks: Drink[] = [];
  orderedDrinks: Drink [] = [];
  totalOrderCost= 0;

  ngOnInit(){
    this.appService.getDrinks();
    this.drinksSub = this.appService.getDrinksUpdateListner()
      .subscribe((drinks: Drink[]) =>{
        this.drinks = drinks;
      });
      this.appService.firstCallIngreients(); 
  }

  onCancel(){
    let e = false;
    this.close.emit(e);
  }


  addDrinkToOrder(drink: Drink){
    this.orderedDrinks.push(drink);
    this.totalOrderCost = 0;
    for (drink of this.orderedDrinks) {
      this.totalOrderCost += drink.cost;
    }
    
  }

  onAddingNewDrink(){
    this.isAddingNewDrink.emit();
    this.onCancel();
  }

  removeDrinkFromMenu(drink: Drink){
    this.appService.deleteDrink(drink._id)
  }

  onSubmit(){
    const order: Order = {
      _id: '',
      drink: this.orderedDrinks,
      number: 0,
      time: new Date(),
      ready: false
    }

    this.appService.addOrder(order);

    let e = false;
    this.close.emit(e); 
  }
}
