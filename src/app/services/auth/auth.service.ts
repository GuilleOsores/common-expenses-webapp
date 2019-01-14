import { Injectable } from '@angular/core';

import { RolesService } from '../roles/roles.service';
import { Role, Permission, Action} from 'common-expenses-libs/libs';
import { map, reduce, find, single } from 'rxjs/operators';
import { pipe, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private permission: Permission[];

  constructor(private rolesService: RolesService) {
    //this.getPermission();
  }

  getPermission (program: string){
    if(!this.permission){
      this.permission = new Object() as Permission[];
      return this.rolesService.getRoleById$('e0c1f020-1628-11e9-be6d-197c3ca23a05')
      .pipe<Permission[]>(
        map<Role, Permission[]>(
          (role: Role) => role.permissions
          )
      )
      .pipe(
        map(
          (value) =>{
            console.log(`sdwqe: ${JSON.stringify(value)}`)
            this.permission= value;
            return value;
          }
        )
      )/*
      .pipe(      
        reduce((acc, val) => { console.log("odhsaod");return val })
        /*
        reduce(
          (permission: Permission, permissions: Permission[], i: number) => {
            console.log(`auth service devuelve permission: ${JSON.stringify(permission)}`)
            if(permissions[i].program === program){
              console.log(`auth service devuelve permission: ${JSON.stringify(permissions[i])}`)
              //this.permission = permissions[i];
              return permissions[i];
            }
            return null;
          }
      )
      /*
        single(
          (value: Permission, index: number, source)  => {
            console.log(`en single: ${JSON.stringify(value)}`)
            console.log(`en single: ${JSON.stringify(index)}`)
            console.log(`en single: ${typeof source}`)
            return value.program === program
          }
        )
        
      )*/
    }else{
      return of(this.permission);
    }
  }
/*
  canOpen(){
    return this.permission.action.open || false;
  }

  canRead(){
    return this.permission.action.read || false;
  }

  canInsert(){
    return this.permission.action.write || false;
  }

  canUpdate(){
    return this.permission.action.write || false;
  }

  canDelete(){
    return this.permission.action.delete || false;
  }*/
}
