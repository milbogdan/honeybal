import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AccountService } from '../../services/account.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, NgIf, LoaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  loading: boolean = false;

  constructor(private accountService: AccountService) {}

  // ngOnInit() {
  //   this.loading = false;
  //   if (this.accountService.currentUser === null) {
  //     this.accountService.getUser().subscribe({
  //       next: (user) => {
  //         this.loading = false;
  //         this.accountService.changeUser(user);
  //       },
  //       error: () => (this.loading = false),
  //       complete: () => {
  //         this.loading = false
  //       }
  //     });
  //   }
  // }
}
