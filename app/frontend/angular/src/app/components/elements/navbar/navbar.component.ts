import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible2 : boolean = false;
  isMenuOpen: boolean = false;
  user : User | null = null;
  msgError : string | null = null;
  router : Router = inject(Router); 
  private destroy$ = new Subject<void>();
  accountService : AccountService = inject(AccountService);
  cartService : CartService = inject(CartService);
  cartItems: any[] = [];

  ngOnInit() {
    this.accountService.user$.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (user) => {
        this.user = user;
      }
    });

    this.cartService.cart$.subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;
      }
    })
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    this.router.navigate(['/login']);
    this.accountService.logout().subscribe({
      next: () => {
        
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
