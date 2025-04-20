import { Component, inject } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, NgClass, CommonModule } from '@angular/common';
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
import { map } from 'rxjs';

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
    StepsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    LoaderComponent,
    ButtonModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './view-cart-page.component.html',
  styleUrl: './view-cart-page.component.css',
})
export class ViewCartPageComponent {
  cartItems: any[] = [];
  activeIndex: number = 0;
  items: MenuItem[] | undefined;
  cartService: CartService = inject(CartService);
  messageService: MessageService = inject(MessageService);
  accountService: AccountService = inject(AccountService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  orderService: OrderService = inject(OrderService);

  user: User | null = null;
  loading: boolean = false;

  userFirstName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userCity: string = '';
  userPostalCode: string = '';
  userAddress: string = '';
  deliveryMethod: number | null = null;
  deliveryComment: string = '';
  deliveryOptions: DeliveryMethod[] = [
    { id: 1, name: 'Post Express' },
    { id: 2, name: 'Dostava na teritoriji Kragujevca' },
  ];

  submitted: boolean = false;

  ngOnInit() {
    this.accountService.currentUser.subscribe({
      next: (user) => {
        this.loading = true;
        if (user) {
          this.user = user;
          this.userFirstName = user.firstName || '';
          this.userLastName = user.lastName || '';
          this.userEmail = user.email || '';
          this.userAddress = user.address || '';
        } else {
          this.user = null;
        }

        this.loading = false;
      },
      error: (_) => (this.user = null),
      complete: () => {
        this.loading = false;
      },
    });

    this.cartService.cart$.subscribe({
      next: (data) => {
        this.cartItems = data;
      },
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
      },
    ];
  }

  onActiveIndexChange(event: number) {
    if (event > this.activeIndex && !this.isStepValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Greška',
        detail: 'Molimo popunite sva obavezna polja pre nastavka.',
      });
      return;
    }
    this.activeIndex = event;
  }

  totalPrice(): number {
    return this.cartItems.reduce((totalPrice, item) => {
      return totalPrice + item.variationPrice * item.variationQuantity;
    }, 0);
  }

  goToNextStep() {
    if (this.activeIndex === 1 && !this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Greška',
        detail: 'Molimo popunite sva obavezna polja pre nastavka.',
      });
      return;
    }

    if (this.activeIndex < this.items!.length - 1) {
      this.activeIndex++;
    }
  }

  isFormValid(): boolean {
    return (
      this.userFirstName.trim() !== '' &&
      this.userLastName.trim() !== '' &&
      this.userEmail.trim() !== '' &&
      this.userPhone.trim() !== '' &&
      this.userCity.trim() !== '' &&
      this.userPostalCode.trim() !== '' &&
      this.userAddress.trim() !== '' &&
      this.deliveryMethod !== null &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userEmail)
    );
  }

  isStepValid(): boolean {
    if (this.activeIndex === 1) {
      return (
        this.userFirstName.trim() !== '' &&
        this.userLastName.trim() !== '' &&
        this.userEmail.trim() !== '' &&
        this.userPhone.trim() !== '' &&
        this.userCity.trim() !== '' &&
        this.userPostalCode.trim() !== '' &&
        this.userAddress.trim() !== '' &&
        !!this.deliveryMethod
      );
    }
    return true;
  }

  goToPrevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  private makeOrder() {
    const order: Order = {
      deliveryTypeId: +this.deliveryMethod!,
      comment: this.deliveryComment,
      phoneNumber: this.userPhone,
      address:
        this.userAddress + ' ' + this.userCity + ' ' + this.userPostalCode,
      email: this.userEmail,
      variations: [
        ...this.cartItems.map((item) => {
          return {
            quantity: item.variationQuantity,
            productVariationId: item.variationId,
          };
        }),
      ],
    };

    this.orderService.makeOrder(order).subscribe();
  }

  buy(): void {
    this.confirmationService.confirm({
      header: 'Zavrsi narudzbinu',
      message: 'Molimo potvrdite da zelite zakljuciti narudzbinu.',
      accept: () => {
        this.makeOrder();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Narudzbina je uspesno zakljucena!',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'Narudzbina nije zakljucena!',
        });
      },
    });
  }
}
