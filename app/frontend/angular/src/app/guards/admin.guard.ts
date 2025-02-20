import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService : AccountService = inject(AccountService);
  const router = inject(Router);

  // return accountService.user$.pipe(
  //   map((user) => {
  //     if(user && user.role === "ROLE_ADMIN"){
  //       return true;
  //     }
  //     else{
  //       router.navigate(['/']);
  //       return false;
  //     }
  //   })
  // );
  return true;
};