import { Component, Input} from '@angular/core';
import { Drink, Ingredient } from '../../app.models';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {
  @Input({required: true}) drink!: Drink
}
