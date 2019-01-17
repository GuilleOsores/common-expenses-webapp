import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs'

import { Mode } from '../../utils/utils'

import { BuildingService } from '../../services';
import { Building } from 'common-expenses-libs/libs';
import { BuildingDetailComponent } from '../building-detail/building-detail.component'

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  private mode: Mode;
  private filter: string;
  buildings: Array<Building> = new Array<Building>(); //Observable<Building[]> = new Observable();
  selectedBuilding: any;
  subscription: Subscription = new Subscription();

  constructor (
    private buildingService: BuildingService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
      
    }

  ngOnInit () {
    this.getBuildings();
  }

  applyFilter (filter: string) {
    this.filter = filter;
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

  getBuildings = () => {
    
    const subscription = this.buildingService.getBuildings$()
    .subscribe(
      (buildings) => { this.buildings = buildings; },
      error => {console.log('error::::');  console.log(error); }
    )
    this.subscription.add(subscription);
  }

  createBuilding = () => {
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getBuildings
    )
  }

  editBuilding = (building: Building) => {
    console.dir("llego a buildings: ", building);
    
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: building
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getBuildings
    )
  }

  deleteBuilding = (building) => {
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: building
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getBuildings
    )
  }

  viewBuilding = (building) => {
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.view,
          building: building
        }
      }
    );
  }

  viewApartments (buildingId: string){
    this.router.navigate([buildingId, 'apartments'], { relativeTo: this.route })
    .then(console.log)
    .catch(console.log);
  }

  viewInvoices (buildingId: string){
    this.router.navigate([buildingId, 'invoices'], { relativeTo: this.route })
    .then(console.log)
    .catch(console.log);
  }
}
