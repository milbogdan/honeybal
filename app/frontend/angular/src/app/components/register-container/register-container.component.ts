import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'register-container',
  imports: [FormsModule, InputTextModule, InputGroupModule, ButtonModule, InputGroupAddonModule, RouterModule],
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
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      password: registerForm.value.password
    };

    if(user.email && user.username && user.firstName && user.lastName && user.password && registerForm.value.password === registerForm.value.confirmPassword) {
      this.accountService.register(user).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: (error) => console.error(error),
      });
    }

    registerForm.reset();
    this.router.navigate(['/login']);
  }
}
