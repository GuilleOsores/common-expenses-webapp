import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, reduce, find, single } from 'rxjs/operators';
import { pipe, of, Observable } from 'rxjs';

import { RolesService } from '../roles/roles.service';
import { Role, Permission, Action, User} from 'common-expenses-libs/libs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: User;
  private permission: Permission[];

  constructor(private rolesService: RolesService, private httpClient: HttpClient) {
  }

  createUser (userId: string, user: string, password: string) {
    return this.httpClient.post(
      environment.api.auth["/"],
      {userId, user, password}
    )
    .pipe(
      map(
        (res: any) => {
          this.loggedUser = res.Items[0];
          this.getRoles(res.Items[0].roles);
          return !!this.loggedUser;
        }
      )
    )
  }

  needsLogin () : boolean {
    return !this.loggedUser;
  }

  login (user: string, password: string) {
    return this.httpClient.post(
      environment.api.auth.authenticate,
      {user, password}
    )
    .pipe(
      map(
        (res: any) => {
          this.loggedUser = res.Items[0];
          this.getRoles(res.Items[0].roles);
          return !!this.loggedUser;
        }
      )
    )
  }

  getRoles (roles: string[]) {
    for(const rolId of roles){
      this.rolesService.getRoleById$(rolId)
      .subscribe(
        (rol) => {
          const i = this.loggedUser.roles.findIndex( (_rolId: any) => rolId === _rolId );
          this.loggedUser.roles[i] = rol;
        }
      )
    }
  }

  canOpen (program: string) {
    return this.checkPermission(program, 'open');
  }

  canRead (program: string) {
    return this.checkPermission(program, 'read');
  }

  canInsert (program: string) {
    return this.checkPermission(program, 'write');
  }

  canUpdate (program: string) {
    return this.checkPermission(program, 'write');
  }

  canDelete (program: string) {
    return this.checkPermission(program, 'delete');
  }

  private checkPermission (program: string, action: string) {
    return this.loggedUser && this.loggedUser.roles
    .reduce<boolean>(
      (prev, curr, i, j) => {
        if(!curr.permissions) return (prev || false);
        const item = curr.permissions.find(
          (permission) => {
            return (permission.program === program);
          });
          return (prev || (item && item.action[action]));
      },
      false
    );
  }
}
