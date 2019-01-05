import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Apartment, Building} from '../../classes';
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
  private building: Building;
  //private buildingName: string;
  private mode: Mode;  
  private apartments: MatTableDataSource<Apartment>;
  private selectedBuilding: any;
  
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
    this.getBuilding()
    .then(
      building => {
        this.building = building;
        this.getApartments();
      }
    )
    .catch(console.log);
  }

  applyFilter (filter: string){
    this.apartments.filter = filter;
  }

  getBuilding = () => {
    return new Promise<Building>(
      (resolve, reject) => {
        this.buildingService.getBuildingById$(this.buildingId).pipe()
        .subscribe(
          resolve,
          reject
        )
      }
    )    
  }

  getApartments = () => {
    this.apartmentsService.getApartments$(this.building.buildingsId)
    .subscribe(
      (apartments) => { this.apartments = new MatTableDataSource(apartments);},
      error => {console.log('error::::');  console.log(error); }
    )
  }

  createApartment = () => {
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.insert,
          building: this.building
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getApartments,
      /*
      (apartment) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(apartment));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  editApartment = (apartment) => {
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: this.building,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getApartments,
      /*
      (apartment) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(apartment));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  deleteApartment = (apartment) => {
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: this.building,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getApartments,
      /*
      (apartment) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(apartment));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  viewApartment = (apartment) => {
    const dialogRef = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.view,
          building: this.building,
          apartment: apartment
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getApartments,
      /*
      (apartment) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(apartment));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

}
