import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const custGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.authLoginUser?.userRole === 'ADMIN'
    ? true
    : router.createUrlTree(['dashboard', 'home']);
};
