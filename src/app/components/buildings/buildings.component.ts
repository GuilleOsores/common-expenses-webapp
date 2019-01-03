import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { BuildingService } from '../../services/buildings/building.service';
import { Building } from '../../../../../common-expenses-libs/libs';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  buildings: MatTableDataSource<Building>;

  //buildings: Building[];
  //dataSource: [];
  displayedColumns: string[] = ['name', 'address'];

  constructor (private buildingService: BuildingService) {
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
      (buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildings = new MatTableDataSource(<Building[]>buildings.Items); console.log(JSON.stringify(this.buildings));  }/*this.buildings = buildings*/,
      //(buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.dataSource = <Building[]>buildings.Items }/*this.buildings = buildings*/,
      error => {console.log('errior::::');  console.log(error); }
    )
  }

}
