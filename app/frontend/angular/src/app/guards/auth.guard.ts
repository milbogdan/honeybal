import { inject } from '@angular/core'; 
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { map, catchError, of, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.user$.pipe(
    map(user => {
      console.log('user: ', user);
      if (user) return true;
      // router.navigate(['/login']);
      // return false;
      return true;
    }),
    catchError(()=> {
      return of(false);
    })
  );
};
