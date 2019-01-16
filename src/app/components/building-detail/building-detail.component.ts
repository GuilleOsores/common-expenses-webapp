import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Building } from '../../classes';
import { BuildingService } from '../../services'

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.css']
})
export class BuildingDetailComponent implements OnInit {

  private formGroup: FormGroup;
  /*
  private formControlId: FormControl;
  private formControlName: FormControl;
  private formControlAddress: FormControl;
  private formControlAddress: FormControl;
  */
  private Mode = Mode;

  constructor(
    private buildingService: BuildingService,
    public dialogRef: MatDialogRef<BuildingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
     buildingsId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
      address: new FormControl( '', Validators.required ),
      commonExpensesAmmount: new FormControl( '', Validators.required ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getBuildingById(this.data.building.buildingsId)
      .then( 
        (building) => {
          for( const prop in building ){
            if( this.formGroup.controls[prop] ){
              this.formGroup.controls[prop].setValue(building[prop]);
            }
          }
        }
      );
    }    
  }

  getBuildingById = (id: any): Promise<Building> => {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.getBuildingById$(id)
        .subscribe(
          (building) => {
            if(building)
              resolve(building);
            else
              reject('Building not found');
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
          this.newBuilding().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateBuilding().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteBuilding().then(this.closeDialog);
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

  newBuilding (): Promise<Building> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.newBuilding$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateBuilding (): Promise<Building> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.updateBuilding$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteBuilding (): Promise<Building> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.deleteBuilding$(this.formGroup.value.buildingsId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }
}
