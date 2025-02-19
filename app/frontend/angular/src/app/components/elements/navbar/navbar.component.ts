import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/User';

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

  constructor(private accountService : AccountService){}

  ngOnInit() {
    this.accountService.checkAuthStatus().subscribe({
      next: (user) => {
        this.user = user;
        // console.log(this.user);
      },
      error: (error) => {
        this.msgError = error.message;
      }
    })
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    this.accountService.logout();
  }
}
