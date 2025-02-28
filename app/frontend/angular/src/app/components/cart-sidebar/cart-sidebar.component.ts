import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'cart-sidebar',
  imports: [ NgClass, NgFor ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
  @Input() visible! : boolean;
  @Output() closeEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  cartItems: any[] = [];
  numOfItemsIncart : number = 0;
  cartService : CartService = inject(CartService);
  router : Router = inject(Router);

  ngOnInit() {
    this.cartService.cart$.subscribe({
      next: (cartItems : any) => {
        this.cartItems = cartItems;
      }
    });
    this.numOfItemsIncart = this.cartItems.length; 
  }

  closeSidebar() : void {
    this.closeEmitter.emit(false);
  }
  
  removeItem(variationId : number){
    this.cartService.removeCartItem(variationId);
  }

  totalPrice() : number{
    return this.cartItems.reduce((totalPrice, item)=>{
      return totalPrice + item.variationPrice * item.variationQuantity;
    },0);
  }

  viewCart(){
    this.router.navigate(['/cart']);
  }
}
