import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { Mode } from '../../utils/utils'

import { Apartment, Building } from 'common-expenses-libs/libs';
import { ApartmentsService } from '../../services'

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private Mode = Mode;
  private building: Building;
  private apartment: Apartment;
  private subscription: Subscription = new Subscription();

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
      apartmentsId: new FormControl( '' ),
      number: new FormControl( '', Validators.required ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getApartmentById()
      .then( 
        (apartment) => {
          for( const prop in apartment ){
            if( this.formGroup.controls[prop] ){
              this.formGroup.controls[prop].setValue(apartment[prop]);
            }
          }
        }
      );
    }    
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  getApartmentById = (): Promise<Apartment> => {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
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
          )
        )
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
        this.subscription.add(
          this.apartmentsService.newApartment$(this.building.buildingsId, this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  updateApartment (): Promise<Apartment> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.apartmentsService.updateApartment$(this.building.buildingsId, this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  deleteApartment (): Promise<Apartment> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.apartmentsService.deleteApartment$(this.building.buildingsId, this.apartment.apartmentsId)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

}
