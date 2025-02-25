import { inject } from '@angular/core'; 
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  // accountService.getUser().subscribe({
  //   next: (resp) => {
  //     console.log('getUser', resp);
  //   },
  // });

  return true;

};
