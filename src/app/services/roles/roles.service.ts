import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Role } from 'common-expenses-libs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  private url = environment.api.roles;

  constructor (private httpClient: HttpClient) {
  }

  getRoles$ (){
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <Role[]>res.Items)
    );
  }

  getRoleById$ (id: string){
    return this.httpClient.get<any>(this.url + '/' + id)
    .pipe(
      map( 
        res => {
          if( res.Items )
            return <Role>res.Items[0];
          else
            return null;
        }
      )
    );
  }

  newRole$ (role: Role){
    return this.httpClient.post<any>(this.url, role)
    .pipe(
      map( res => <Role>res.Attributes)
    );
  }

  updateRole$ = (role: Role) => {
    return this.httpClient.put<any>(this.url + '/' + role.rolesId, role)
    .pipe(
      map( res => <Role>res.Attributes)
    );
  }

  deleteRole$ (id: string){
    return this.httpClient.delete<Role>(this.url + '/' + id);
  }
}
