import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.user$.pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        return false;
      }
    })
  );

};
