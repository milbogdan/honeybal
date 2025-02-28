import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.getUser().pipe(
    map(user => user === null),
    tap(isLoggedOut => {
      if (!isLoggedOut) {
        router.navigate(['/home']);
      }
    })
  );
};
