import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { MatDialog } from '@angular/material';
import { Building } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils'
import { BuildingService } from '../building.service';
import { BuildingDetailComponent } from '../building-detail/building-detail.component'


@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  private mode: Mode;
  private filter: string;
  private buildings: Array<Building> = new Array<Building>();
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
    const subscription = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    )
    .afterClosed().subscribe(
      this.getBuildings
    );
    this.subscription.add(subscription);
  }

  editBuilding = (building: Building) => {
    const subscription = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: building
        }
      }
    )
    .afterClosed().subscribe(
      this.getBuildings
    );
    this.subscription.add(subscription);
  }

  deleteBuilding = (building) => {
    const subscription = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: building
        }
      }
    )
    .afterClosed().subscribe(
      this.getBuildings
    );
    this.subscription.add(subscription);
  }

  viewBuilding = (building) => {
    this.matDialog.open(
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
