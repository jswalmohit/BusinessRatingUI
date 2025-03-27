import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userToken = localStorage.getItem('token'); 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if the user is logged in
  }
  logout() {
    localStorage.clear(); // Clear the token from localStorage
  }
  getEmailIDFromToken(): string | null {
    if (this.userToken) {
      try {
        const decodedToken: any = jwtDecode(this.userToken);
        return decodedToken.EmailId || null; // Ensure the token contains an "email" claim
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  // Decode token and get email
  getEmailFromToken(): string | null {
    if (this.userToken) {
      try {
        const decodedToken: any = jwtDecode(this.userToken);
        return decodedToken.Cus_Id || null; // Ensure the token contains an "email" claim
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getRoleIdFromToken(): string | null {
    if (this.userToken) {
      try {
        const decodedToken: any = jwtDecode(this.userToken);
        return decodedToken.RoleID || null; // Ensure the token contains an "email" claim
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  
}
