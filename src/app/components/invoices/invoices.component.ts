import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Invoice, Building } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils';
import { InvoiceService, BuildingService, AuthService } from '../../services';
import { InvoicesDetailComponent } from '../invoices-detail/invoices-detail.component';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  private buildingId: string;
  private building: Building;
  private mode: Mode;  
  private invoices: MatTableDataSource<Invoice>;
  private subscription: Subscription = new Subscription();
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'year', 'month', 'ammount', 'dueDate', 'paidDate'];

  constructor (
    private buildingService: BuildingService,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.subscription.add(
      route.params.subscribe(
        params => {
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
        this.getInvoices();
      }
    )
    .catch(console.log);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  getBuilding = () => {
    return new Promise<Building>(
      (resolve, reject) => {
        this.subscription.add(
          this.buildingService.getBuildingById$(this.buildingId)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )    
  }

  applyFilter (filter: string){
    this.invoices.filter = filter;
  }

  getInvoices = () => {
    this.subscription.add(
      this.invoiceService.getInvoices$(this.buildingId)
      .subscribe(
        (invoices) => { this.invoices = new MatTableDataSource(invoices); },
        error => {console.log('error::::');  console.log(error); }
      )
    )
  }

  createInvoice = () => {
    const subscription = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.insert,
          building: this.building
        }
      }
    )
    .afterClosed().subscribe(
      this.getInvoices
    );
    this.subscription.add(subscription);
  }

  editInvoice = (invoice) => {
    const subscription = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: this.building,
          invoice
        }
      }
    )
    .afterClosed().subscribe(
      this.getInvoices
    );
    this.subscription.add(subscription);
  }

  deleteInvoice = (invoice) => {
    const subscription = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: this.building,
          invoice
        }
      }
    )
    .afterClosed().subscribe(
      this.getInvoices
    );
    this.subscription.add(subscription);
  }

  viewInvoice = (invoice) => {
    this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.view,
          building: this.building,
          invoice
        }
      }
    );
  }
}
