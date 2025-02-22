import { Component, inject, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'cart-sidebar',
  standalone: false,
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
  @Input() visible! : boolean;
  cartItems: any[] = [];
  cartService : CartService = inject(CartService);
  @Output() closeEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();

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
}