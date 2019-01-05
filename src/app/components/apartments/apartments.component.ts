import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Mode } from '../../utils/utils'

import { BuildingService } from '../../services/buildings/building.service';
import { ApartmentsService } from '../../services/apartments/apartments.service';
import { ApartmentDetailComponent } from '../apartment-detail/apartment-detail.component'


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  private buildingId: string;
  private buildingName: string;
  private mode: Mode;  
  apartments: MatTableDataSource<any>;
  selectedBuilding: any;
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'apartmentsId'];

  constructor (
    private buildingService: BuildingService,
    private apartmentsService: ApartmentsService,
    private matDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(
      params => {
        console.log('parametros', JSON.stringify(params));
        this.buildingId = params.buildingId;
      }
    );
  }

  ngOnInit () {
    this.getBuilding();
    this.getApartments();
  }

  applyFilter (filter: string){
    this.apartments.filter = filter;
  }

  getBuilding (){
    this.buildingService.getBuildingById(this.buildingId)
    .subscribe(
      (buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildingName = buildings.Items[0].name},
      //(buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildings = <Building[]>buildings.Items },
      error => {console.log('errior::::');  console.log(error); }
    )
  }

  getApartments (){
    this.apartmentsService.getApartments(this.buildingId)
    .subscribe(
      (buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.apartments = new MatTableDataSource(<any[]>buildings.Items);},
      //(buildings: any) => { console.log(JSON.stringify(buildings.Items)); this.buildings = <Building[]>buildings.Items },
      error => {console.log('errior::::');  console.log(error); }
    )
  }

  createApartment (){
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (apartment) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(apartment));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  editApartment (apartment){
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.update,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      (apartment) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(apartment));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  deleteApartment (apartment){
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.delete,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      (apartment) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(apartment));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

  viewApartment (apartment){
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.view,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      (apartment) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(apartment));
        /*
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
        */
      }
    )
  }

}
