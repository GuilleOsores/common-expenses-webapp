import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Role, action, Permission } from 'common-expenses-libs';
import { RolesService } from '../../services';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  private formGroup: FormGroup; private permissionsArray: FormArray;
  private Mode = Mode;
  private permisionRow: number = 0;
  private role: Role;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RoleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    const that = this;
    this.permissionsArray = new FormArray([]);
    this.formGroup = this.formBuilder.group({
    //this.formGroup = new FormGroup({
      rolesId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
      //permissions: new FormArray([])
      permissions: this.permissionsArray
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getRoleById(this.data.role.rolesId)
      .then( 
        (role) => {
          this.formGroup.controls['rolesId'].setValue(role.rolesId);
          this.formGroup.controls['name'].setValue(role.name);
          that.role = role;
/*
          for( const prop in role ){
            if( this.formGroup.controls[prop] ){
              if(prop === 'permissions'){
                console.log(`en if(prop === 'permissions'){`);
                role.permissions.forEach(
                  (permission) => {
                    const permisionsArray = <FormArray>this.formGroup.controls['permissions'];
                    const actionsArray =  new FormArray([]);

                    const itempermisionArray = new FormGroup({
                      program: new FormControl('', Validators.required),
                      actions: actionsArray                   
                    });

                    actionsArray.push(new FormControl(false));
                    actionsArray.push(new FormControl(false));
                    actionsArray.push(new FormControl(false));
                    actionsArray.push(new FormControl(false));

                    for(const action in permission.actions){
                      actionsArray.controls[action].setValue(true)
                    }
                  }
                )
              }else
                this.formGroup.controls[prop].setValue(role[prop]);
            }
          }*/
        }
      );
    }    
  }

  getRoleById = (id: any): Promise<Role> => {
    return new Promise(
      (resolve, reject) => {
        this.rolesService.getRoleById$(id)
        .subscribe(
          (role) => {
            if(role)
              resolve(role);
            else
              reject('Role not found');
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
          this.newRole().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateRole().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteRole().then(this.closeDialog);
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

  addNewPermisionRow = () => {
    const permisionsArray = <FormArray>this.formGroup.controls[`permissions`];
    permisionsArray.push(
      this.formBuilder.group({
        program: this.formBuilder.control(''),
        actions: this.formBuilder.array([
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control(''),
        ])
      })
    );
  }

  newRole (): Promise<Role> {
    return new Promise(
      (resolve, reject) => {
        this.rolesService.newRole$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateRole (): Promise<Role> {
    return new Promise(
      (resolve, reject) => {
        this.rolesService.updateRole$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteRole (): Promise<Role> {
    return new Promise(
      (resolve, reject) => {
        this.rolesService.deleteRole$(this.formGroup.value.rolesId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }
}
