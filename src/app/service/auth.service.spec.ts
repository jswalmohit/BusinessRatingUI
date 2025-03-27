import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
  });
// check if the service is created
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // check for isAuthenticated
  describe('isAuthenticated', () => {
    it('should return true if there is a token in localStorage', () => {
      localStorage.setItem('token', 'fake-jwt-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false if there is no token in localStorage', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
//check for logout function
  describe("logout", ()=> {
    it("should clear the token from localStorage", () => {
      spyOn(localStorage, 'clear');
      authService.logout();
      expect(localStorage.clear).toHaveBeenCalled();
    });
  });
//check for getEmailFromToken
describe("getEmailIDFromToken", () => {
    it("should return email ID from token", () => {});
});

});
