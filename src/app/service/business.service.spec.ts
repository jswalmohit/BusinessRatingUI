import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BusinessService } from './business.service';

describe('BusinessService', () => {
  let service: BusinessService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HTTP requests
      providers: [BusinessService],       // Provide the BusinessService for testing
    });

    service = TestBed.inject(BusinessService);  // Inject the service
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
    apiUrl = service['apiUrl'];  // Get the apiUrl from the service
  });

  afterEach(() => {
    httpMock.verify();  // Ensure no HTTP requests are pending after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case for the registerBusiness method
  it('should send a POST request to register a business', () => {
    const formData = new FormData();
    formData.append('businessName', 'Test Business');
    formData.append('ownerName', 'John Doe');

    const mockResponse = { success: true, message: 'Business registered successfully' };

    // Call the registerBusiness method
    service.registerBusiness(formData).subscribe(response => {
      expect(response.success).toBe(true);
      expect(response.message).toBe('Business registered successfully');
      // Assert the HTTP request
      const req = httpMock.expectOne({
        method: 'POST',
        url: apiUrl,
      });
      expect(req.request.body).toEqual(formData);  // Check if the request body is correct
      req.flush(mockResponse); // Simulate a successful response
    });
    // Additional test case for error handling (optional)
    it('should handle error if the request fails', () => {
      const formData = new FormData();
      formData.append('businessName', 'Test Business');
      formData.append('ownerName', 'John Doe');

      const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };

      // Call the registerBusiness method
      service.registerBusiness(formData).subscribe(
        () => fail('Expected an error, but got success'),  // Fail the test if success is received
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );
      // Assert the HTTP request
      const req = httpMock.expectOne({
        method: 'POST',
        url: apiUrl,
      });
      req.flush('Error', mockErrorResponse); // Simulate an error response

    });
  });
});
