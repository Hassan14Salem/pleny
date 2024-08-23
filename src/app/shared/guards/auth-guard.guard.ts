import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  // Injecting the Router service

  if('userToken' in localStorage)
  {
   router.navigate(['/sss'])
    return false;
  }
  else
  {
    return true
  }
};
