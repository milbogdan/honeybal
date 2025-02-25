import { Component, inject, HostListener } from '@angular/core';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntil, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.interface';
import { AccountService } from '../../services/account.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-navbar',
  imports: [ AvatarModule, AvatarGroupModule, NgIf, NgClass, CartSidebarComponent, AsyncPipe, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible$ = new BehaviorSubject<boolean>(false);
  isMenuOpen: boolean = false;
  user : User | null = null;
  msgError : string | null = null;
  router : Router = inject(Router); 
  private destroy$ = new Subject<void>();
  accountService : AccountService = inject(AccountService);
  
  ngOnInit() {
    this.accountService.user$.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (user) => {
        this.user = user;
      }
    });
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

  openCart() {
    this.visible$.next(true);
  }

  closeCart() {
    this.visible$.next(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.closeCart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
