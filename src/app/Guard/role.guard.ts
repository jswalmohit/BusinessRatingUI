import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let roleId = authService.getRoleIdFromToken();;
  // let roleId = localStorage.getItem('roleId');
  if (roleId == '1')
    return true;
  else
    return false;
};
