import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Service } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils'

import { ServicesService, AuthService } from '../../services';
import { ServicesDetailComponent } from '../services-detail/services-detail.component'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  private mode: Mode;  
  services: MatTableDataSource<Service>;
  selectedService: any;
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private buildingService: ServicesService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit () {
    this.getServices();
  }

  applyFilter (filter: string){
    this.services.filter = filter;
  }

  getServices = () => {
    this.buildingService.getServices$()
    .subscribe(
      (services) => { this.services = new MatTableDataSource(services); },
      error => {console.log('error::::');  console.log(error); }
    )
  }

  createService = () => {
    const dialogRef = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getServices
      /*
      (building) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(building));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  editService = (service) => {
    const dialogRef = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.update,
          service
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getServices
      /*
      (building: Building) => {
        console.log('el dialog devolvio::::');
        console.log(JSON.stringify(building));
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  deleteService = (service) => {
    const dialogRef = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.delete,
          service
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getServices
      /*
      (building) => {
        console.log('el dialog devolvio:::::');
        console.log(JSON.stringify(building));        
        this.buildings.data.push(building);
        this.buildings.filter = this.buildings.filter;
      }*/
    )
  }

  viewService = (service) => {
    const dialogRef = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.view,
          service
        }
      }
    );
  }

}
