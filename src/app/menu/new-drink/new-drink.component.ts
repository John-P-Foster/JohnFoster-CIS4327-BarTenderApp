import { Component,EventEmitter, Output, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { CustomDialogComponent } from '../../shared/custom-dialog/custom-dialog.component';
import { Ingredient, Drink } from '../../app.models';


@Component({
  selector: 'app-new-drink',
  standalone: true,
  imports: [CustomDialogComponent, FormsModule],
  templateUrl: './new-drink.component.html',
  styleUrls: ['./new-drink.component.css', '../../shared/site-standard.css']
})
export class NewDrinkComponent {
  @Output() close = new EventEmitter();
  @Output() isAddingNewIngredient = new EventEmitter(); 

  private appService = inject(AppService);
  private ingredientsSub!: Subscription; 

  enteredName = 'Name of Drink';
  enteredCost = 0.0;
  ingredients: Ingredient[]=[]
  drinkIngredients: Ingredient[]=[]

  ngOnInit(){
    this.appService.getIngredients();
    this.ingredientsSub = this.appService.getIngredientsUpdateListner()
      .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      });
      this.appService.firstCallIngreients(); 
  }

  onCancel(){
    this.close.emit();
  }

  onSubmit(){
    const drink: Drink = {_id: '', name: this.enteredName, cost: this.enteredCost, ingredients: this.drinkIngredients };
    this.appService.addDrink(drink);
    this.close.emit(); 
  }

  addingNewIngredient(){
    this.isAddingNewIngredient.emit();
    this.onCancel();
  }

  deleteIngredient(ingredient: Ingredient){
    this.appService.deleteIngredient(ingredient._id);
  }

  addIngredient(ingredient: Ingredient){
    this.drinkIngredients.push(ingredient);
    console.log(ingredient.title);
  }
}
