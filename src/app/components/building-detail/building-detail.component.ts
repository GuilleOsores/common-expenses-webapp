import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Mode } from '../../utils/utils'

import { BuildingService } from '../../services/buildings/building.service'

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.css']
})
export class BuildingDetailComponent implements OnInit {
  
  @Input('mode') mode: Mode;
  @Input('buildingId') buildingId: any;
  private formGroup: FormGroup;
  private formControlId: FormControl;
  private formControlName: FormControl;
  private formControlAddress: FormControl;
  private Mode = Mode;

  building: any;

  constructor(private buildingService: BuildingService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: this.formControlId = new FormControl( '' ),
      name: this.formControlName = new FormControl( '', Validators.required ),
      address: this.formControlAddress = new FormControl( '', Validators.required ),
    });  
    this.getBuildingById(this.buildingId)
    .then( 
      (building) => {
        console.log('el edificio');
        
        console.log(JSON.stringify(building));
        this.formControlId.setValue(building.buildingsId);
        this.formControlName.setValue(building.name);
        this.formControlAddress.setValue(building.address);
      }
    );
  }

  getBuildingById (id: any): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        this.buildingService.getBuildingById(id)
        .subscribe(
          (value: any) => {
            if(value.Items[0])
              this.building = value.Items[0];
              resolve(this.building);
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
      }
    )    
  }

  onSubmit(){
    if(this.formGroup.valid)
      console.log(JSON.stringify(this.formGroup.value));
  }

}
