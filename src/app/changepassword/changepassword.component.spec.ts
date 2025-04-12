import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ChangepasswordComponent } from './changepassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { of } from 'rxjs';

fdescribe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;
  let routerSpy: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
    const adminSpy = jasmine.createSpyObj('AdminService', ['changePassword']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ChangepasswordComponent],
      providers: [
        { provide: 'AdminService', useValue: adminSpy },
        { provide: 'Router', useValue: routerMock },
        { provide: 'AuthService', useValue: {} },
        { provide: ActivatedRoute, useValue: adminSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    adminServiceSpy = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create form with 3 controls', () => {
    expect(component.changePasswordForm.contains('currentPassword')).toBeTruthy();
    expect(component.changePasswordForm.contains('newPassword')).toBeTruthy();
    expect(component.changePasswordForm.contains('confirmPassword')).toBeTruthy();
  }
  );
  it('should make the currentPassword control required', () => {
    const control = component.changePasswordForm.get('currentPassword');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  }
  );
  it('should make the newPassword control required', () => {
    const control = component.changePasswordForm.get('newPassword');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  }
  );
  it('should make the confirmPassword control required', () => {
    const control = component.changePasswordForm.get('confirmPassword');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  }
  );
  it('should check if newPassword and confirmPassword match', () => {
    const form = component.changePasswordForm;
    form.get('currentPassword')?.setValue('oldpassword');
    form.get('newPassword')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password123');
    expect(form.valid).toBeTruthy();
  }
  );
  it('should check if newPassword and confirmPassword do not match', () => {
    const form = component.changePasswordForm;
    form.get('newPassword')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password456');
    expect(form.valid).toBeFalsy();
  }
  );
  // it('should call API and navigate on success', fakeAsync(() => {
  //   adminServiceSpy.changePassword.and.returnValue(of({ text: 'Success' }));
  //   spyOn(window, 'alert');
  //   component.token = 'abc';

  //   component.changePasswordForm.setValue({
  //     currentPassword: 'oldpass',
  //     newPassword: 'newpass',
  //     confirmPassword: 'newpass'
  //   });

  //   component.onSubmit();
  //   tick(2000);

  //   expect(adminServiceSpy.changePassword).toHaveBeenCalled();
  //   expect(component.message).toBe('Success');
  //   expect(window.alert).toHaveBeenCalledWith('Password changed successfully.');
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  // })); 

  
  /*
  it('should call changePassword on submit', () => {
    const changePasswordSpy = spyOn(component.adminService, 'changePassword').and.callThrough();
    component.changePasswordForm.get('currentPassword')?.setValue('oldpassword');
    component.changePasswordForm.get('newPassword')?.setValue('newpassword');
    component.changePasswordForm.get('confirmPassword')?.setValue('newpassword');
    component.onSubmit();
    expect(changePasswordSpy).toHaveBeenCalled();
  }
  );
  it('should handle error response on submit', () => {
    const errorResponse = { error: 'Error occurred' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Error occurred');
  }
  );
  it('should handle success response on submit', () => {
    const successResponse = { text: 'Password changed successfully' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => success(successResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('Password changed successfully');
  }
  );
  it('should navigate to login page after successful password change', () => {
    const successResponse = { text: 'Password changed successfully' };
    spyOn(component.router, 'navigate');
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => success(successResponse)
    });
    component.onSubmit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  }
  );
  it('should set error message on error response', () => {
    const errorResponse = { error: 'Error occurred' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Error occurred');
  }
  );
  it('should set message to empty on error response', () => {
    const errorResponse = { error: 'Error occurred' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on error response', () => {
    const errorResponse = { error: '' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on default error response', () => {
    const errorResponse = { error: '' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on empty error response', () => { 
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on empty error response', () => {
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on undefined error response', () => {
    const errorResponse = { error: undefined };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on undefined error response', () => {
    const errorResponse = { error: undefined };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on null error response', () => {
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on null error response', () => {
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on empty string error response', () => {
    const errorResponse = { error: '' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on empty string error response', () => {
    const errorResponse = { error: '' };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  });
  it('should set error message to default on null error response', () => {
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  it('should set message to empty on null error response', () => {
    const errorResponse = { error: null };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.message).toEqual('');
  }
  );
  it('should set error message to default on undefined error response', () => {
    const errorResponse = { error: undefined };
    spyOn(component.adminService, 'changePassword').and.returnValue({
      subscribe: (success: any, error: any) => error(errorResponse)
    });
    component.onSubmit();
    expect(component.error).toEqual('Something went wrong');
  }
  );
  */
});
