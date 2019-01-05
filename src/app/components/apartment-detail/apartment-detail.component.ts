import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Apartment, Building } from '../../classes';
import { ApartmentsService } from '../../services'

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private formControlId: FormControl;
  //private formControlName: FormControl;
  //private formControlAddress: FormControl;
  private Mode = Mode;
  private building: Building;
  private apartment: Apartment;

  constructor(
    private apartmentsService: ApartmentsService,
    public dialogRef: MatDialogRef<ApartmentsService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.building = data.building;
    this.apartment = data.apartment;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      apartmentsId: this.formControlId = new FormControl( '', Validators.required ),
      //name: this.formControlName = new FormControl( '', Validators.required ),
      //address: this.formControlAddress = new FormControl( '', Validators.required ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getApartmentById()
      .then( 
        (apartment) => {          
          console.log(JSON.stringify(apartment));
          this.formControlId.setValue(apartment.apartmentsId);
          //this.formControlName.setValue(building.name);
          //this.formControlAddress.setValue(building.address);
        }
      );
    }    
  }

  getApartmentById = (): Promise<Apartment> => {
    return new Promise(
      (resolve, reject) => {
        this.apartmentsService.getApartmentById$(this.building.buildingsId, this.apartment.apartmentsId)
        .subscribe(
          (apartment) => {
            if(apartment)
              resolve(apartment);
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
          this.newApartment().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateApartment().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteApartment().then(this.closeDialog);
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

  newApartment (): Promise<Apartment> {
    return new Promise(
      (resolve, reject) => {
        this.apartmentsService.newApartment$(this.building.buildingsId, this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateApartment (): Promise<Apartment> {
    return new Promise(
      (resolve, reject) => {
        this.apartmentsService.updateApartment$(this.building.buildingsId, this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteApartment (): Promise<Apartment> {
    return new Promise(
      (resolve, reject) => {
        this.apartmentsService.deleteApartment$(this.building.buildingsId, this.apartment.apartmentsId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

}
