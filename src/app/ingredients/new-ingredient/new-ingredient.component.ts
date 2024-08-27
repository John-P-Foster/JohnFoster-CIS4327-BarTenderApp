
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  enteredName = 'Name of New Ingredient';

  onCancel(){
    let e = false;
    this.close.emit(e);
  }

  onSubmit(){
    const ingredient: Ingredient = {_id: '', title: this.enteredName};
    this.appService.addIngredient(ingredient);
    let e = false;
    this.close.emit(e); 
  }
}
