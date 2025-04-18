import { Component, inject, HostListener } from '@angular/core';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntil, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.interface';
import { AccountService } from '../../services/account.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-navbar',
  imports: [
    AvatarModule,
    AvatarGroupModule,
    NgIf,
    NgClass,
    CartSidebarComponent,
    AsyncPipe,
    RouterModule,
    LoaderComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  visible$ = new BehaviorSubject<boolean>(false);
  isMenuOpen: boolean = false;
  loggedUser: User | null | undefined = undefined;
  msgError: string | null = null;
  router: Router = inject(Router);
  private destroy$ = new Subject<void>();
  accountService: AccountService = inject(AccountService);
  isLoading$ = this.accountService.loading$;

  ngOnInit() {
    this.accountService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.loggedUser = user;
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.accountService.logout().subscribe();
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
