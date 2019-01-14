import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'

import { User } from 'common-expenses-libs/libs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.api.users;

  constructor (private httpClient: HttpClient) {
  }

  getUsers$ (){
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <User[]>res.Items)
    );
  }

  getUserById$ (id: string){
    return this.httpClient.get<any>(this.url + '/' + id)
    .pipe(
      map( res => <User>res.Items[0])
    );
  }

  newUser$ (user: User){
    return this.httpClient.post<any>(this.url, user)
    .pipe(
      map( res => <User>res.Attributes)
    );
  }

  updateUser$ = (user: User) => {
    return this.httpClient.put<any>(this.url + '/' + user.usersId, user)
    .pipe(
      map( res => <User>res.Attributes)
    );
  }

  deleteUser$ (id: string){
    return this.httpClient.delete<User>(this.url + '/' + id);
  }
}