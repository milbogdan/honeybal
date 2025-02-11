import { Component } from '@angular/core';
@Component({
  selector: 'login-container',
  standalone: false,
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  onSubmit(loginForm : any){
    console.log(loginForm.value);
  }
}
