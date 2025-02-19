import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/User';
import { Router } from '@angular/router';

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

  constructor(private accountService : AccountService){}

  ngOnInit() {
    this.accountService.getUser().subscribe({
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
    this.accountService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);        
      }
    });
  }
}
