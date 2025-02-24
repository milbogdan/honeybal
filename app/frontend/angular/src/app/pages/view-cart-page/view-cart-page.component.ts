import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-cart-page',
  standalone: false,
  templateUrl: './view-cart-page.component.html',
  styleUrl: './view-cart-page.component.css'
})
export class ViewCartPageComponent {
  cartItems : any[] = [];
  activeIndex: number = 0;
  items: MenuItem[] | undefined;
  cartService : CartService = inject(CartService);
  messageService : MessageService = inject(MessageService);

  ngOnInit(){
    this.cartService.cart$.subscribe({
      next:(data)=>{
        this.cartItems = data;
      }
    });

    this.items = [
      {
          label: 'Sadrzaj korpe',
          command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
          label: 'Informacije o korisniku i nacin dostave',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
          label: 'Pregled korpe',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
      }
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  totalPrice() : number{
    return this.cartItems.reduce((totalPrice, item)=>{
      return totalPrice + item.variationPrice * item.variationQuantity;
    },0);
  }

  goToNextStep(){
    if (this.activeIndex < this.items!.length - 1) {
      this.activeIndex++;
    }
  }
}
