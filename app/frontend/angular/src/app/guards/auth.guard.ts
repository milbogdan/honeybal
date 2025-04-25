import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { filter, map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  
  return accountService.currentUser.pipe(
    filter(user => user !== undefined),
    map(user => {
      if(user === null){
        return router.createUrlTree(['/home']);
      }
      else {
        return true;
      }
    })
  )
};
