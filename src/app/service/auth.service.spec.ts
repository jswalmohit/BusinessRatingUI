import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

// Manually spy on jwtDecode for Jasmine
// jestSpyOnJwtDecode is not defined, so this line has been removed.

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('token', 'dummy-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if no token', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('logout', () => {
    it('should clear token, email, and roleId', () => {
      localStorage.setItem('token', 'token');
      localStorage.setItem('email', 'test@example.com');
      localStorage.setItem('roleId', '1');

      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('email')).toBeNull();
      expect(localStorage.getItem('roleId')).toBeNull();
    });
  });

  describe('setUserDetail', () => {
    it('should decode and store user data from token', () => {
      const fakeToken = 'fake-token';
      const decodedToken = {
        EmailId: 'test@example.com',
        RoleID: '2',
        Cus_Id: '123'
      };

      localStorage.setItem('token', fakeToken);
      spyOn<any>(require('jwt-decode'), 'jwtDecode').and.returnValue(decodedToken);

      service = new AuthService(); // Reconstruct to pick up token from localStorage
      service.setUserDetail();

      expect(localStorage.getItem('userEmail')).toBe('test@example.com');
      expect(localStorage.getItem('userRoleId')).toBe('2');
      expect(localStorage.getItem('customerId')).toBe('123');
    });

    it('should handle decode error gracefully', () => {
      localStorage.setItem('token', 'invalid-token');
      spyOn<any>(require('jwt-decode'), 'jwtDecode').and.throwError('Invalid token');
      spyOn(console, 'error');

      service = new AuthService();
      service.setUserDetail();

      expect(console.error).toHaveBeenCalled();
    });
  });

  it('getUserEmail should return email from localStorage', () => {
    localStorage.setItem('email', 'user@example.com');
    expect(service.getUserEmail()).toBe('user@example.com');
  });

  it('getcustomerIDFromToken should return customerId', () => {
    localStorage.setItem('customerId', '101');
    expect(service.getcustomerIDFromToken()).toBe('101');
  });

  it('getRoleIdFromToken should return roleId', () => {
    localStorage.setItem('roleId', '5');
    expect(service.getRoleIdFromToken()).toBe('5');
  });
});
