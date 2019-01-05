import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Mode } from '../../utils/utils'

import { BuildingService } from '../../services/buildings/building.service';
import { Building } from '../../../../../common-expenses-libs/libs';
import { BuildingDetailComponent } from '../building-detail/building-detail.component'

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  private mode: Mode;  
  buildings: MatTableDataSource<Building>;
  selectedBuilding: any;
  
  displayedColumns: string[] = ['launch', 'view', 'edit', 'delete', 'name', 'address'];

  constructor (
    private buildingService: BuildingService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit () {
    this.getBuildings();
  }

  applyFilter (filter: string){
    this.buildings.filter = filter;
  }

  getBuildings (){
    this.buildingService.getBuildings()
    .subscribe(
      (buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildings = new MatTableDataSource(<Building[]>buildings.Items);},
      //(buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildings = <Building[]>buildings.Items },
      error => {console.log('errior::::');  console.log(error); }
    )
  }

  createBuilding (){
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  editBuilding (building){
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
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  deleteBuilding (building){
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
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  viewBuilding (building){
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.view,
          building: building
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  viewApartments (buildingId: string){
    this.router.navigate([buildingId, 'apartments'], { relativeTo: this.route })
    .then(console.log)
    .catch(console.log);
  }
}
