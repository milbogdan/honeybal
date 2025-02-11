import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register-container',
  standalone: false,
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.css'
})
export class RegisterContainerComponent {
  accountService : AccountService = inject(AccountService);
  router : Router = inject(Router);

  onSubmit(registerForm : NgForm){
    let user = {
      email: registerForm.value.email,
      username: registerForm.value.username,
      name: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      password: registerForm.value.password
    };

    // Privremeno ostavljeno ovako dok se ne namesti ispis gresaka
    if((!user.email || !user.username || !user.name || !user.lastName || !user.password) && registerForm.value.password === registerForm.value.confirmPassword){
      this.accountService.register(user).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      }); 
    }

    registerForm.reset();
    this.router.navigate(['/login']);
  }
}
