import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'login-container',
  standalone: false,
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  accountService : AccountService = inject(AccountService);

  onSubmit(loginForm : any){
    console.log(loginForm.value);
  }
}
