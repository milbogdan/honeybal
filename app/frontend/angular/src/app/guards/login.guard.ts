import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser.pipe(
    filter(user => user !== undefined),
    tap(user => console.log('Guard: currentUser is', user)),
    map(user => {
      if (user) {
        return router.createUrlTree(['/home']);
      }
      return true;
    })
  );
};
