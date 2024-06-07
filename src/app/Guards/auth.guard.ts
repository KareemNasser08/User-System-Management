import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localStorageData = localStorage.getItem('token');
  if (localStorageData !== null) {
    return true;
  } else {
    router.navigateByUrl('/sign-in')
    return false;
  }
};

