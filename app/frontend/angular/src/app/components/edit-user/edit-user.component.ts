import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  private destroy$ = new Subject<void>();
  accountService = inject(AccountService);
  router = inject(Router);

  ngOnInit(){
    this.accountService.currentUser.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        if(!user){
          this.router.navigate(['/home']);
        }
      }
    })
  }

  editUserForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
  })

  onSubmit() : void {
    console.log(this.editUserForm);
  }
}
