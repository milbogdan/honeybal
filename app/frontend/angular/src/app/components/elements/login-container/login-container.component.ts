import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'login-container',
  standalone: false,
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  accountService : AccountService = inject(AccountService);
  router : Router = inject(Router);

  onSubmit(loginForm : NgForm){
    this.accountService.login(loginForm.value.email, loginForm.value.password).subscribe({
      next: (resp) =>{
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
