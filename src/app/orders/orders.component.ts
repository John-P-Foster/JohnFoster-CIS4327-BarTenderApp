import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { CustomDialogComponent } from '../shared/custom-dialog/custom-dialog.component';
import { Drink, Order } from '../app.models';
import { OrderComponent } from './order/order.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CustomDialogComponent, FormsModule,CommonModule,NgFor,OrderComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../shared/site-standard.css' ]
})
export class OrdersComponent {
  @Output() close = new EventEmitter();
  @Output() isAddingNewDrink = new EventEmitter();
  @Output() adminIsViewingMenu = new EventEmitter();

  private appService = inject(AppService);
  private ordersSub!: Subscription;

  orders: Order[] = [];
  
  ngOnInit(){
    this.appService.getOrders();
    this.ordersSub = this.appService.getOrdersUpdateListner()
      .subscribe((orders: Order[]) =>{
        this.orders = orders;
      });
      this.appService.firstCallOrders(); 
  }


  onCancel(){
    this.close.emit();
  }

  onAddingNewDrink(){
    this.isAddingNewDrink.emit();
    this.onCancel();
  }

  onAdminViewingMenu(){
    this.adminIsViewingMenu.emit();
    this.onCancel();
  }

  onSubmit(){
    this.close.emit(); 
  }


}
