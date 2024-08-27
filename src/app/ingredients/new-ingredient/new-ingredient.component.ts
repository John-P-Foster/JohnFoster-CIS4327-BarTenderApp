
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { CustomDialogComponent } from '../../shared/custom-dialog/custom-dialog.component';
import { Ingredient } from '../../app.models';

@Component({
  selector: 'app-new-ingredient',
  standalone: true,
  imports: [CustomDialogComponent, FormsModule],
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css', '../../shared/site-standard.css']
})
export class NewIngredientComponent {
  @Output() close = new EventEmitter();

  private appService = inject(AppService);
  private ingredientsSub!: Subscription; 

  enteredName = 'Name of New Ingredient';
  ingredients: Ingredient[]=[]

  ngOnInit(){
    this.appService.getIngredients();
    this.ingredientsSub = this.appService.getIngredientsUpdateListner()
      .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      });
      this.appService.firstCallIngreients(); 
  }


  onCancel(){
    let e = false;
    this.close.emit(e);
  }

  deleteIngredient(ingredient: Ingredient){
    this.appService.deleteIngredient(ingredient._id);
  }

  onSubmit(){
    const ingredient: Ingredient = {_id: '', title: this.enteredName};
    this.appService.addIngredient(ingredient);
    let e = false;
    this.close.emit(e); 
  }
}
