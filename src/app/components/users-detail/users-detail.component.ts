import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { User } from 'common-expenses-libs/libs';
import { UsersService } from '../../services'

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private Mode = Mode;

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<UsersDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
     usersId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
      roles: new FormGroup({
        rolesId: new FormControl( '' ),
        name: new FormControl( '' )
      })
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getUserById(this.data.user.usersId)
      .then( 
        (user) => {
          for( const prop in user ){
            if( this.formGroup.controls[prop] ){
              this.formGroup.controls[prop].setValue(user[prop]);
            }
          }
        }
      );
    }    
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
