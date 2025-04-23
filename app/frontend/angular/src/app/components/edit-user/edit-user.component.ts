import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.interface';
import { checkPassword } from '../../utils/utils';

@Component({
  selector: 'edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  private destroy$ = new Subject<void>();
  user : User | null | undefined = undefined;
  editUserForm!: FormGroup;
  accountService = inject(AccountService);
  router = inject(Router);

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
          password: new FormControl(''),
          confirmPassword: new FormControl(''),
          notificationCb: new FormControl(),
          mailNotificationCb: new FormControl(),
        });
      }
    });
  }

  getDirtyFormValues(): { [key: string]: any } {
    const dirtyValues: { [key: string]: any } = {};

    Object.keys(this.editUserForm.controls).forEach((key) => {
      const control = this.editUserForm.get(key);
      if (control?.dirty && control.value !== this.user?.[key as keyof User]) {
        dirtyValues[key] = control.value;
      }
    });

    return dirtyValues;
  }

  onSubmit() : void {
    const passwordControl = this.editUserForm.get('password');
    const confirmPasswordControl = this.editUserForm.get('confirmPassword');

    const dirtyValues = this.getDirtyFormValues();

    if ('password' in dirtyValues) {
      if (passwordControl && confirmPasswordControl) {
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;
  
        if(checkPassword(password, confirmPassword)){
          // Pozovi api
          this.updateUser(dirtyValues);
        }
        else{
          //Sifre nisu iste baci toats error
        }
      }
    }
    else{
      // Pozovi api
      this.updateUser(dirtyValues);
    }
  }

  private updateUser(dirtyValues: { [key: string]: any }): void {
    if (this.user) {
      console.log(dirtyValues)
      const updatedUser = { ...this.user, ...dirtyValues };
      console.log(updatedUser);
      this.accountService.editUser(this.user.id, updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully');
        },
        error: (err) => {
          console.error('Error updating user', err);
        },
      });
    }
  }
}
