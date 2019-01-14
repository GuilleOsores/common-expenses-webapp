import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs'

import { Mode } from '../../utils/utils'

import { BuildingService, AuthService } from '../../services';
import { Building, Permission } from 'common-expenses-libs/libs';
import { BuildingDetailComponent } from '../building-detail/building-detail.component'

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  private mode: Mode;  
  buildings: MatTableDataSource<Building>;
  selectedBuilding: any;
  subscription: Subscription = new Subscription();
  permission: Permission;
  
  displayedColumns: string[] = ['launch', 'launchInvoices', 'view', 'edit', 'delete', 'name', 'address'];

  constructor (
    private buildingService: BuildingService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
      this.authService.getPermission('Buildings').subscribe(
        (permission) => {
          (permission) => permission.program === 'Buildings'
          //this.permission = permission[0];
        }
      );
    }

  ngOnInit () {
    
    this.getBuildings();
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

  applyFilter (filter: string){
    this.buildings.filter = filter;
  }

  getBuildings = () => {
    const subscription = this.buildingService.getBuildings$()
    .subscribe(
      (buildings) => { this.buildings = new MatTableDataSource(buildings); },
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
      /*
      (building) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(building));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  editBuilding = (building) => {
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
      /*
      (building: Building) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(building));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
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
      /*
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));        
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
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
