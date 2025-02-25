import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup'; 
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { switchMap, take } from 'rxjs/operators';
import { inject } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'login-container',
  imports: [
    FormsModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    RouterModule
  ],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})
export class LoginContainerComponent {
  accountService : AccountService = inject(AccountService);
  router : Router = inject(Router);

  // onSubmit(loginForm: NgForm) {
  //   this.accountService.login(
  //     loginForm.value.email,
  //     loginForm.value.password
  //   ).subscribe({
  //     next: (user) => {
  //       // this.router.navigate(['/home']);
  //     },  
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
}
