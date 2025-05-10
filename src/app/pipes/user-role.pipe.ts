import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(roleID: any): unknown {
    let userRoleId = roleID as number;
    let userRoleName: string | null;
    switch (userRoleId) {
      case 1: // Admin
        userRoleName = 'Super Admin';
        break;
      case 2:
        userRoleName = 'Sub Admin';
        break;
      case 3: 
      userRoleName = 'Business';
      break;
      case 4:
        userRoleName = 'Admin';
        break;
      default:
        userRoleName =  'Customer';
    }
    return userRoleName;
  }

}
