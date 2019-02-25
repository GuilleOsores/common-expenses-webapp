import { Component, OnInit, OnDestroy, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Service } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils';

import { ServicesService } from '../services.service';

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private Mode = Mode;
  private subscription: Subscription = new Subscription();

  constructor(
    private buildingService: ServicesService,
    public dialogRef: MatDialogRef<ServicesService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      servicesId: new FormControl( '' ),
      name: new FormControl( '', Validators.required ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getServiceById(this.data.service.servicesId)
      .then( 
        (service) => {
          for (const prop in service){
            if (this.formGroup.controls[prop]){
              this.formGroup.controls[prop].setValue(service[prop]);
            }
          }
        }
      );
    }    
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  getServiceById = (id: any): Promise<Service> => {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
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
          )
        )
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
        this.subscription.add(
          this.buildingService.newService$(this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  updateService (): Promise<Service> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.buildingService.updateService$(this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  deleteService (): Promise<Service> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.buildingService.deleteService$(this.data.service.servicesId)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

}
