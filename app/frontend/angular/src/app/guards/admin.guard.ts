import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { filter, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  
  return accountService.currentUser.pipe(
    filter(user => user !== undefined),
    map(user => {
      if(user && user.role === "ROLE_ADMIN"){
        return router.createUrlTree(['/admin']);
      }
      else{
        return router.createUrlTree(['/home']);
      }
    })
  );
};
