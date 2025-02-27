import { Component, inject } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StepsModule } from 'primeng/steps';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.interface';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-cart-page',
  imports: [ 
    NavbarComponent,
    NgIf,
    NgClass, 
    NgFor, 
    StepsModule, 
    UpperCasePipe, 
    RouterModule,
    FormsModule,
    LoaderComponent
  ],
  providers: [ CartService, MessageService ],
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

  user : User | null = null;
  loading : boolean = true;

  ngOnInit(){
    this.accountService.getUser().subscribe({
      next: (user) => {
        this.loading = false
        this.user = user;
        console.log(this.user);
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

  onSubmit(userInfoForm : any) {
    console.log(userInfoForm);   
  }
}
