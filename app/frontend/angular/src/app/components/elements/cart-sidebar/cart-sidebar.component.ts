import { Component, inject, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cart-sidebar',
  standalone: false,
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
  @Input() visible! : boolean;
  @Output() closeEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  cartItems: any[] = [];
  cartService : CartService = inject(CartService);
  router : Router = inject(Router);

  ngOnInit() {
    this.cartService.cart$.subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;
      }
    });
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