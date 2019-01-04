import { Component, OnInit } from '@angular/core';
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
  
  displayedColumns: string[] = ['id', 'name', 'address'];

  constructor (private buildingService: BuildingService, private matDialog: MatDialog) {
  }

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

  editBuilding (){
    const dialogRef = this.matDialog.open(
      BuildingDetailComponent,
      {
        data: {
          mode: Mode.update
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

  show (id){
    console.log(id);
    this.selectedBuilding = id;
    //this.mode = Mode.view;
    //this.mode = Mode.update;
    this.mode = Mode.delete;
  }

}
