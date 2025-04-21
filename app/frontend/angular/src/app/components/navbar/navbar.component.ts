import { Component, inject, HostListener } from '@angular/core';
import { NgIf, NgClass, AsyncPipe, CommonModule } from '@angular/common';
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
    CommonModule,
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

  @HostListener('document:click', ['$event'])
  closeMenuOnClick(event: MouseEvent){
    const menuElement = document.querySelector('.navbar__menu');
    const toggleButton = document.querySelector('.navbar__toggle');
    const isClickInsideMenu = menuElement?.contains(event.target as Node);
    const isClickOnToggle = toggleButton?.contains(event.target as Node);

    if (!isClickInsideMenu && !isClickOnToggle) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    this.accountService.logout().subscribe();
  }

  openCart() {
    console.log('10');
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
