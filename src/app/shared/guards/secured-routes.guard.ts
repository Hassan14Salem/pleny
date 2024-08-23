import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const securedRoutesGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);  // Injecting the Router service

  if('userToken' in localStorage)
  {
    return true;
  }
  else
  {
   router.navigate(['/sss'])
    return false
  }
};
