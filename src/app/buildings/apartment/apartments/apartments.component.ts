import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Apartment, Building} from 'common-expenses-libs/libs';

import { Mode } from '../../../utils/utils';

import { ApartmentsService } from '../apartments.service';
import { BuildingService } from '../../building.service';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentDetailComponent } from '../apartment-detail/apartment-detail.component';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit, OnDestroy {

  private buildingId: string;
  private building: Building;
  private mode: Mode;  
  private apartments: MatTableDataSource<Apartment>;
  subscription: Subscription = new Subscription();
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'apartmentsId', 'number'];

  constructor (
    private buildingService: BuildingService,
    private apartmentsService: ApartmentsService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.subscription.add(
      route.params.subscribe(
        params => {
          console.log('parametros', JSON.stringify(params));
          this.buildingId = params.buildingId;
        }
      )
    )
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

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

  applyFilter (filter: string){
    this.apartments.filter = filter;
  }

  getBuilding = () => {
    return new Promise<Building>(
      (resolve, reject) => {
        const subscription = this.buildingService.getBuildingById$(this.buildingId)
        .subscribe(
          resolve,
          reject
        );
        this.subscription.add(subscription);
      }
    )    
  }

  getApartments = () => {
    const subscription = this.apartmentsService.getApartments$(this.building.buildingsId)
    .subscribe(
      (apartments) => { this.apartments = new MatTableDataSource(apartments);},
      error => {console.log('error::::');  console.log(error); }
    );
    this.subscription.add(subscription);
  }

  createApartment = () => {    
    const subscription = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.insert,
          building: this.building
        }
      }
    )
    .afterClosed().subscribe(
      this.getApartments,
    );
    this.subscription.add(subscription);
  }

  editApartment = (apartment) => {
    const subscription = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: this.building,
          apartment: apartment
        }
      }
    )
    .afterClosed().subscribe(
      this.getApartments,
    );
    this.subscription.add(subscription);
  }

  deleteApartment = (apartment) => {
    const subscription = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: this.building,
          apartment: apartment
        }
      }
    )
    .afterClosed().subscribe(
      this.getApartments,    
    );
    this.subscription.add(subscription);
  }

  viewApartment = (apartment) => {
    const subscription = this.matDialog.open(
      ApartmentDetailComponent,
      {
        data: {
          mode: Mode.view,
          building: this.building,
          apartment: apartment
        }
      }
    )
    .afterClosed().subscribe(
      this.getApartments,
    );
    this.subscription.add(subscription);
  }

}
