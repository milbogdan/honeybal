import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../models/User';
import { take } from 'rxjs';  

@Component({
  selector: 'login-container',
  standalone: false,
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  accountService : AccountService = inject(AccountService);
  router : Router = inject(Router);

  onSubmit(loginForm: NgForm) {
    this.accountService.login(
      loginForm.value.email,
      loginForm.value.password
    ).pipe(
      switchMap(() => this.accountService.getUser()),
      take(1)
    ).subscribe({
      next: (user) => {
        console.log(user);
        if (user.role === "ROLE_ADMIN") {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
