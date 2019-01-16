import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { User, Role } from 'common-expenses-libs/libs';
import { UsersService, RolesService } from '../../services'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private Mode = Mode;
  private allRoles: Role[];
  private subscriptions: Subscription = new Subscription();
  private selectedRolesId: string[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<UsersDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
     usersId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
      roles: new FormArray([])
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getUserById(this.data.user.usersId)
      .then( 
        (user) => {
          for(const prop in user ){
            if(this.formGroup.controls[prop] && prop === 'roles' ){
              const rolesArray = <FormArray>this.formGroup.controls['roles'];
              for(const rol of user.roles){
                rolesArray.push(
                  new FormGroup({
                    rolesId: new FormControl(rol.rolesId),
                  })
                )
              }
            }else{
              this.formGroup.controls[prop].setValue(user[prop]);
            }
          }
        }
      );
    }

    this.subscriptions.add(
      this.rolesService.getRoles$()
      .subscribe(
        (roles) => this.allRoles = roles
      )
    )
  }

  getUserById = (id: any): Promise<User> => {
    return new Promise(
      (resolve, reject) => {
        this.usersService.getUserById$(id)
        .subscribe(
          (user) => {
            if(user)
              resolve(user);
            else
              reject('User not found');
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
      }
    )    
  }

  onSubmit () {
    if(this.formGroup.valid){
      switch(this.data.mode){
        case Mode.insert:
          this.newUser().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateUser().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteUser().then(this.closeDialog);
          break;
        case Mode.view:
          this.dialogRef.close();
          break;
      }
    }
  }

  closeDialog = () => {
    this.dialogRef.close(this.formGroup.value);
  }

  addNewRoleRow = () => {
    const rolesArray = <FormArray>this.formGroup.controls[`roles`];
    rolesArray.push(
      new FormGroup({
        rolesId: new FormControl(''),
      })
    );
  }

  deleteRolFormControl = (id: number) => {
console.log(`el id:::::::: ${id}`)
    const rolesArray = <FormArray>this.formGroup.controls['roles'];
    rolesArray.removeAt(id);
  }

  newUser (): Promise<User> {
    return new Promise(
      (resolve, reject) => {
        this.usersService.newUser$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateUser (): Promise<User> {
    return new Promise(
      (resolve, reject) => {
        this.usersService.updateUser$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteUser (): Promise<User> {
    return new Promise(
      (resolve, reject) => {
        this.usersService.deleteUser$(this.formGroup.value.usersId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }
}
