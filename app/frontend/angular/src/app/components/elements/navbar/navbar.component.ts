import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  accountService : AccountService = inject(AccountService);

  ngOnInit() {
    this.accountService.getUser().subscribe({
      next: (user) => {
        console.log(user);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
