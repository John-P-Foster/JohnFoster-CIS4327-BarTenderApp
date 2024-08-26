import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service'; 
import { CustomDialogComponent } from '../../shared/custom-dialog/custom-dialog.component'; 
import { Drink, Order } from '../../app.models'; 

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CustomDialogComponent, FormsModule,CommonModule,NgFor],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css','../../shared/custom-dialog/custom-dialog.component.css']
})
export class OrderComponent {

  @Input({required: true}) order!: Order;
  

  private appService = inject(AppService);

  orderReady(order : Order){
    this.appService.updateOrderReadyStatus(order._id, order.ready);
  }

  deleteOrder(order: Order){
    this.appService.deleteOrder(order._id);
  }
  trackByOrderId(index: number, order: Order): string {
    return order._id;
  }
  
  trackByDrinkId(index: number, drink: Drink): string {
    return drink._id;
  }
}
