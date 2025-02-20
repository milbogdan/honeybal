import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService : AccountService = inject(AccountService);
  const router = inject(Router);

  return accountService.user$.pipe(
    map((user) => {
      if(user){
        return false;
      }
      else{
        router.navigate(['/login']);
        return true;
      }
    })
  );
};