import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserRolePipe } from '../../pipes/user-role.pipe';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, HttpClientModule, UserRolePipe],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  roleID: any;
  emailID :any;
  title = 'business';
  dropdownOpen = false;
  constructor(private router: Router, private authService: AuthService) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
    this.dropdownOpen = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
    this.dropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.roleID = localStorage.getItem('userRoleId');
    this.emailID=localStorage.getItem('userEmail');
  }
  ProfileInfo(){
    this.router.navigateByUrl("/edit-user");
    this.dropdownOpen = false;
  }
  ProfileChangePassword(){
    this.router.navigateByUrl("/Change-password");
  }

}
