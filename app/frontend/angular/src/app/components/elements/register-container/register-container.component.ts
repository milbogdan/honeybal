import { Component } from '@angular/core';

@Component({
  selector: 'register-container',
  standalone: false,
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.css'
})
export class RegisterContainerComponent {
  onSubmit(registerForm : any){
    console.log(registerForm.value); 
  }
}
