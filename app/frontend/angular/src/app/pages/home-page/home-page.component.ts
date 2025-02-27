import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AccountService } from '../../services/account.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, NgIf, LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  loading : boolean = true;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getUser().subscribe({
      next: () => this.loading = false,
      error: () => this.loading = false
    });
  }
}
