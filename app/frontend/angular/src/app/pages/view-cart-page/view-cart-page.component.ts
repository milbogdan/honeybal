import { Component, inject } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MenuItem } from 'primeng/api';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StepsModule } from 'primeng/steps';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.interface';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order.service';

interface DeliveryMethod {
  id: number;
  name: string;
}

@Component({
  selector: 'app-view-cart-page',
  imports: [ 
    ConfirmDialog,
    ToastModule,
    NavbarComponent,
    NgIf,
    NgClass, 
    NgFor, 
    StepsModule, 
    UpperCasePipe, 
    RouterModule,
    FormsModule,
    LoaderComponent,
    ButtonModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './view-cart-page.component.html',
  styleUrl: './view-cart-page.component.css'
})
export class ViewCartPageComponent {
  cartItems : any[] = [];
  activeIndex: number = 0;
  items: MenuItem[] | undefined;
  cartService : CartService = inject(CartService);
  messageService : MessageService = inject(MessageService);
  accountService : AccountService = inject(AccountService);
  confirmationService : ConfirmationService = inject(ConfirmationService);
  orderService : OrderService = inject(OrderService);

  user : User | null = null;
  loading : boolean = true;

  userFirstName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userCity: string = '';
  userPostalCode: string = '';
  userAddress: string = '';
  deliveryMethod : number | null = null;
  deliveryComment : string = '';
  deliveryOptions : DeliveryMethod[] = [
    { id: 1, name: 'Post Express' },
    { id: 2, name: 'Dostava na teritoriji Kragujevca' },
  ]
  
  ngOnInit(){
    this.accountService.getUser().subscribe({
      next: (user) => {
        this.loading = false
        this.user = user;
        
        if (user) {
          this.userFirstName = user.firstName || '';
          this.userLastName = user.lastName || '';
          this.userEmail = user.email || '';
          this.userAddress = user.address || '';
        }
      },
      error: () => this.loading = false
    });

    this.cartService.cart$.subscribe({
      next:(data)=>{
        this.cartItems = data;
      }
    });

    this.items = [
      {
          label: 'Sadrzaj korpe',
          // command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
          label: 'Informacije o korisniku i nacin dostave',
          // command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
          label: 'Pregled korpe',
          // command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
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

  goToPrevStep(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }

  private makeOrder(){
    const order : Order = {
      deliveryTypeId: +this.deliveryMethod!,
      comment: this.deliveryComment,
      phoneNumber: this.userPhone,
      address: this.userAddress + " " + this.userCity + " " + this.userPostalCode,  
      email: this.userEmail,
      variations: [
        ...this.cartItems.map(item=>{
          return {
            quantity: item.variationQuantity,
            productVariationId: item.variationId
          };
        })
      ]
    };

    this.orderService.makeOrder(order).subscribe();
  }

  buy() : void {
    this.confirmationService.confirm({
        header: 'Zavrsi narudzbinu',
        message: 'Molimo potvrdite da zelite zakljuciti narudzbinu.',
        accept: () => {
            this.makeOrder();
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Narudzbina je uspesno zakljucena!' });
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Narudzbina nije zakljucena!' });
        },
    });
  }
}
