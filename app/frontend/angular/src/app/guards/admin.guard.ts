import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);

  let canActivate = false;
  accountService.user$.subscribe(user => {
    console.log(user);
    if (user && user.role === 'ROLE_ADMIN') {
      canActivate = true; 
    } else {
      canActivate = false; 
    }
  });

  return canActivate;
};