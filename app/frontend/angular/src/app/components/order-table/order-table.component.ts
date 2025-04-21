import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../models/order.interface';
import { orderMocks } from '../../mocks/orderMocks';

@Component({
  selector: 'order-table',
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {

  orders: Order[] = [];

  ngOnInit(){
    this.orders = orderMocks
  }
}
