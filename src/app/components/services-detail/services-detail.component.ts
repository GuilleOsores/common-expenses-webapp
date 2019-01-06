import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Service } from '../../classes';
import { ServicesService } from '../../services'

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private formControlId: FormControl;
  private formControlName: FormControl;
  private Mode = Mode;

  constructor(
    private buildingService: ServicesService,
    public dialogRef: MatDialogRef<ServicesService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      servicesId: this.formControlId = new FormControl( '' ),
      name: this.formControlName = new FormControl( '', Validators.required ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getServiceById(this.data.service.servicesId)
      .then( 
        (service) => {
          this.formControlId.setValue(service.servicesId);
          this.formControlName.setValue(service.name);
        }
      );
    }    
  }

  getServiceById = (id: any): Promise<Service> => {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.getServiceById$(id)
        .subscribe(
          (service) => {
            if(service)
              resolve(service);
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
          this.newService().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateService().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteService().then(this.closeDialog);
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

  newService (): Promise<Service> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.newService$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateService (): Promise<Service> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.updateService$(this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteService (): Promise<Service> {
    return new Promise(
      (resolve, reject) => {
        this.buildingService.deleteService$(this.data.service.servicesId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

}
