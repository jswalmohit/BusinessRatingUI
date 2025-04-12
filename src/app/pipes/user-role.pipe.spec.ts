import { TestBed } from '@angular/core/testing';
import { UserRolePipe } from './user-role.pipe';

fdescribe('UserRolePipe', () => {
  let pipe: UserRolePipe;
  beforeEach(() => {
   pipe = new UserRolePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return Super Admin for role ID 1', () => {
    expect(pipe.transform(1)).toEqual('Super Admin');
  });
  it('should return Sub Admin for role ID 2', () => {
    expect(pipe.transform(2)).toEqual('Sub Admin');
  });
  it('should return Business for role ID 3', () => {
    expect(pipe.transform(3)).toEqual('Business');
  });
  it('should return Admin for role ID 4', () => {
    expect(pipe.transform(4)).toEqual('Admin');
  });
  it('should return Customer for any other role ID', () => {
    expect(pipe.transform(5)).toEqual('Customer');
  });
});
