import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Mode } from '../../utils/utils'

import { InvoiceService, BuildingService } from '../../services';
import { Invoice, Building } from '../../classes';
import { InvoicesDetailComponent } from '../invoices-detail/invoices-detail.component'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  private buildingId: string;
  private building: Building;
  private mode: Mode;  
  invoices: MatTableDataSource<Invoice>;
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'year', 'month', 'ammount', 'dueDate', 'paidDate'];

  constructor (
    private buildingService: BuildingService,
    private invoiceService: InvoiceService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(
      params => {
        this.buildingId = params.buildingId;
      }
    );
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

  getBuilding = () => {
    return new Promise<Building>(
      (resolve, reject) => {
        this.buildingService.getBuildingById$(this.buildingId)
        .subscribe(
          resolve,
          reject
        )
      }
    )    
  }

  applyFilter (filter: string){
    this.invoices.filter = filter;
  }

  getInvoices = () => {
    this.invoiceService.getInvoices$(this.buildingId)
    .subscribe(
      (invoices) => { this.invoices = new MatTableDataSource(invoices); },
      error => {console.log('error::::');  console.log(error); }
    )
  }

  createInvoice = () => {
    const dialogRef = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.insert,
          building: this.building
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getInvoices
    )
  }

  editInvoice = (invoice) => {
    const dialogRef = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.update,
          building: this.building,
          invoice
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getInvoices
    )
  }

  deleteInvoice = (invoice) => {
    const dialogRef = this.matDialog.open(
      InvoicesDetailComponent,
      {
        data: {
          mode: Mode.delete,
          building: this.building,
          invoice
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getInvoices
    )
  }

  viewInvoice = (invoice) => {
    const dialogRef = this.matDialog.open(
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
