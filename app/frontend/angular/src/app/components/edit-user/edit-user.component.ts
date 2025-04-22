import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.interface';

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
  user : User | null | undefined = undefined;
  editUserForm!: FormGroup;

  ngOnInit(){
    this.accountService.currentUser.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        if(!user){
          this.router.navigate(['/home']);
        }
        this.user = user;

        this.editUserForm = new FormGroup({
          firstName: new FormControl(`${this.user?.firstName}`),
          lastName: new FormControl(this.user?.lastName),
          address: new FormControl(this.user?.address),
          username: new FormControl(this.user?.username),
          phone: new FormControl(this.user?.phone),
        })
      }
    })
  }

  onSubmit() : void {
    console.log(this.editUserForm);
  }
}
