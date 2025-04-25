import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  accountService = inject(AccountService);

  ngOnInit() {
    this.accountService.loadCurrentUser();
  }
}
