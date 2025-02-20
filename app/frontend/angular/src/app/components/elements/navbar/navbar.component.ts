import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
