import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Service } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils'

import { ServicesService } from '../services.service';
import { AuthService } from '../../auth/auth.service';
import { ServicesDetailComponent } from '../services-detail/services-detail.component'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  private mode: Mode;  
  services: MatTableDataSource<Service>;
  private subscription: Subscription = new Subscription();
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private buildingService: ServicesService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) {  }

  ngOnInit () {
    this.getServices();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  applyFilter (filter: string){
    this.services.filter = filter;
  }

  getServices = () => {
    this.subscription.add(
      this.buildingService.getServices$()
      .subscribe(
        (services) => { this.services = new MatTableDataSource(services); },
        error => {console.log('error::::');  console.log(error); }
      )
    )
  }

  createService = () => {
    const subscription = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    )
    .afterClosed().subscribe(
      this.getServices
    );
    this.subscription.add(subscription);
  }

  editService = (service) => {
    const subscription = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.update,
          service
        }
      }
    )
    .afterClosed().subscribe(
      this.getServices
    );
    this.subscription.add(subscription);
  }

  deleteService = (service) => {
    const subscription = this.matDialog.open(
      ServicesDetailComponent,
      {
        data: {
          mode: Mode.delete,
          service
        }
      }
    )
    .afterClosed().subscribe(
      this.getServices
    );
    this.subscription.add(subscription);
  }

  viewService = (service) => {
    this.matDialog.open(
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
