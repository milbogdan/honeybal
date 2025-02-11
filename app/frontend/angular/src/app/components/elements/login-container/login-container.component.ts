import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'login-container',
  standalone: false,
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  accountService : AccountService = inject(AccountService);

  onSubmit(loginForm : NgForm){
    console.log(loginForm.value);
  }
}
