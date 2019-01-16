import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Role, Permission} from 'common-expenses-libs/libs';
import { RolesService } from '../../services';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private Mode = Mode;
  private permisionRow: number = 0;
  private role: Role;

  constructor(
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<RoleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    const that = this;

    this.formGroup = new FormGroup({
      rolesId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
      permissions: new FormArray([])
    });
    
    if( !((<Mode>this.data.mode) === Mode.insert)){ 
      this.getRoleById(this.data.role.rolesId)
      .then( 
        (role) => {
          const controlDisable = this.data.mode === Mode.view || this.data.mode === Mode.delete;
          this.formGroup.controls['rolesId'].setValue(role.rolesId);
          this.formGroup.controls['name'].setValue(role.name);
          that.role = role;
          
          for( const prop in role ){
            if( this.formGroup.controls[prop] ){
              if(prop === 'permissions'){
                console.log(`en if(prop === 'permissions'){`);
                const permisionsArray = <FormArray>this.formGroup.controls['permissions'];
                role.permissions.forEach(
                  (permission) => {
                    console.log(`permission.foreach: ${JSON.stringify(permission)}`);  
                    const actionsArray =  new FormArray([]);

                    permisionsArray.push(
                      new FormGroup({
                        program: new FormControl(permission.program, Validators.required),
                        action: new FormGroup({
                          open: new FormControl({value: permission.action.open, disabled: controlDisable}),
                          read: new FormControl({value: permission.action.read, disabled: controlDisable}),
                          write: new FormControl({value: permission.action.write, disabled: controlDisable}),
                          delete: new FormControl({value: permission.action.delete, disabled: controlDisable})                          
                        })
                      })
                    );
                  }
                )
              }else
                this.formGroup.controls[prop].setValue(role[prop]);
            }

          }
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
      new FormGroup({
        program: new FormControl('', Validators.required),
        action: new FormGroup({
          open: new FormControl(false),
          read: new FormControl(false),
          write: new FormControl(false),
          delete: new FormControl(false)
        })
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
