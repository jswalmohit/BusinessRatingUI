import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { Component, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  responsedata: any;
  roleId: any;
  isPasswordChanged: any;
  errorMessage: string | null = null;
  isLoginButtonDisabled: boolean = false;
  showPassword: boolean = false;
  
  constructor(private fb: FormBuilder, private loginService: LoginService,private authService:AuthService, private router: Router) {
    localStorage.clear();
    // Initialize the form
    this.loginForm = this.fb.group({
      username: ['c@c', Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getters for form controls
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Example method to set an error message
  handleLoginError() {
    this.errorMessage = 'Invalid username or password';
  }

  // Method to clear the error message
  clearError() {
    this.errorMessage = null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoginButtonDisabled = true;
      const loginData = this.loginForm.value;
      this.loginService.getUserLoggedIn(loginData).subscribe({
        next: (result) => {  
          this.responsedata = result;
          if (this.responsedata != null && this.responsedata.token) {
            // Store the token in local storage
            localStorage.setItem('token', this.responsedata.token);
            this.authService.setUserDetail();
            let userRoleId = this.responsedata.roleId;
            if (userRoleId == 3 || userRoleId == 4) {
              // Navigate to the business search page
              this.router.navigateByUrl('/Businesssearch');
            }
            if (userRoleId == 1) {
              // Navigate to the add sub admin page
              this.router.navigateByUrl('/Subadmin');
            }
            if(userRoleId == 2 && this.responsedata.isPasswordChanged == false) 
            {
              // Navigate to the change password page             
              this.router.navigateByUrl('/Change-password')
            }
            if(userRoleId == 2 && this.responsedata.isPasswordChanged == true) 
              {
                // Navigate to the business search page
                this.router.navigateByUrl('/Businesssearch');                
              }
          } else {
            // If token is not available, show a failed login message
            alert('Login Failed!');
            this.isLoginButtonDisabled = false;
          }
        },
        error: (error) => {
          this.isLoginButtonDisabled = false;
          // Handle HTTP error responses like Unauthorized (401)
          if (error.status === 401) {
            alert('Incorrect username or password. Unauthorized!');
          } else {
            // Generic error message for any other errors
            alert('An error occurred during login. Please try again.');
          }
        }
      });
    } else {
      alert('Enter valid username and password!');
      this.isLoginButtonDisabled = false;
    }
  }
  
}
