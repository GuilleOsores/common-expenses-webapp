import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { Role, Permission, Action, User} from 'common-expenses-libs/libs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged: Boolean = false;
  private loggedUser: User;
  private subscription = new Subscription();

  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private httpClient: HttpClient
  ) {
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
    return !this.logged;
  }

  login (user: string, password: string) {
    return this.httpClient.post(
      environment.api.auth.authenticate2,
      {user, password}
    )
    .pipe(
      map(
        (res: any) => {
          if (<boolean>res.auth) {
            localStorage.setItem('token', res.token);
            this.logged = true;
            this.getUser(res.userId)
          }
          return res.auth as boolean;
        }
      )      
    )
  }

  getUser (userId: string) {
    this.subscription.add(
      this.usersService.getUserById$(userId)
      .subscribe(
        (user: any) => {
          this.loggedUser = user;
          this.getRoles(user.roles);
        }
      )
    )
  };

  async getRoles (roles: string[]) {
    for(const rolId of roles){
      this.subscription.add(
        this.rolesService.getRoleById$(rolId)
        .subscribe(
          (rol) => {
            const i = this.loggedUser.roles.findIndex( (_rolId: any) => rolId === _rolId );
            this.loggedUser.roles[i] = rol;
          }//, null,
          //() => this.subscription.unsubscribe()
        )
      )
    }
  };

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
    return this.logged && this.loggedUser.roles
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
