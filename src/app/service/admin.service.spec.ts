import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { environment } from '../../environments/environment';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';

fdescribe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'Admin';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure no extra HTTP calls are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if email exists (GET)', () => {
    const mockEmail = 'test@example.com';
    const mockResponse = true;

    service.checkEmailExistsAdmin(mockEmail).subscribe(res => {
      expect(res).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/check-email?email=${mockEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a sub-admin (POST)', () => {
    const email = 'newadmin@example.com';
    const mockResponse = { success: true };

    service.addSubAdmin(email).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/add-sub-admin?email=${email}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(email);
    req.flush(mockResponse);
  });

  it('should change password (POST)', () => {
    const request: ChangePasswordRequest = {
      currentPassword: 'old123',
      newPassword: 'new123',
      token: 'test-token'
    };

    const mockResponse = { text: 'Password changed' };

    service.changePassword(request).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/change-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(mockResponse);
  });
});
