import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwt-decode as a default function

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    router.navigate(['/login']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token); // Type the decoded token as `any`
    // Check if the token is expired
    const expirationDate = decodedToken.exp * 1000; // exp is in seconds, convert to ms
    const currentDate = new Date().getTime();

    if (currentDate >= expirationDate) {
      // Token is expired, redirect to login
      console.error('Token is expired');
      router.navigate(['/login']);
      return false;
    }

    // Token is valid
    return true;
  } catch (error) {
    console.error('Invalid token', error);
    router.navigate(['/login']);
    return false;
  }
};
