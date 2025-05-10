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
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('email');
    //localStorage.clear(); // Clear the token from localStorage
  }
  setUserDetail(){
    if (this.userToken) {
      try {
        const decodedToken: any = jwtDecode(this.userToken);
        localStorage.setItem('userEmail', decodedToken.EmailId || null); // Ensure the token contains an "email" claim
        localStorage.setItem('userRoleId', decodedToken.RoleID || null); // Ensure the token contains an "RoleID" claim
        localStorage.setItem('customerId', decodedToken.Cus_Id || null); // Ensure the token contains an "Cus_Id" claim
      } catch (error) {
        console.error('Error decoding token:', error);      }
    }
  }
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail'); // Get the email from localStorage
  }
  // Decode token and get email
  getcustomerIDFromToken(): string | null {
    return localStorage.getItem('customerId'); // Get the customerId from localStorage
  }

  getRoleIdFromToken(): string | null {
    return localStorage.getItem('userRoleId'); // Get the roleId from localStorage
  }
  
}
