import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Invoice, Building, Service } from 'common-expenses-libs/libs';

import { Mode } from '../../../utils/utils';
import { InvoiceService } from '../invoice.service';
import { ServicesService } from '../../../services/services.service';


@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private Mode = Mode;
  private invoice: Invoice;
  private building: Building;
  private services: Service[];
  private subscription: Subscription = new Subscription();

  constructor(
    private invoiceService: InvoiceService,
    private servicesService: ServicesService,
    public dialogRef: MatDialogRef<InvoiceService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.building = data.building;
    this.invoice = data.invoice;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      invoicesId: new FormControl( '' ),
      year: new FormControl( '', [Validators.required, Validators.min(2018)] ),
      month: new FormControl( '', [Validators.required, Validators.min(1), Validators.max(12)] ),
      ammount: new FormControl( '', Validators.required ),
      dueDate: new FormControl( {value: '', disabled: true}, Validators.required ),
      paidDate: new FormControl( {value: '', disabled: true} ),
      service: new FormControl( '' ),
    });

    this.subscription.add(
      this.servicesService.getServices$()
      .subscribe( 
        (services) => this.services = services
      )
    );

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getInvoiceById()
      .then( 
        (invoice) => {
          for (const prop in invoice){
            if (this.formGroup.controls[prop])
              this.formGroup.controls[prop].setValue(invoice[prop]);
          }          
        }
      );
    }    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getInvoiceById = (): Promise<Invoice> => {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.invoiceService.getInvoiceById$(this.building.buildingsId, this.invoice.invoicesId)
          .subscribe(
            (invoice) => {
              if(invoice)
                resolve(invoice);
              else
                reject('Building not found');
            },
            error => {
              console.log(error);
              reject(error);
            }
          )
        )
      }
    )    
  }

  onSubmit () {
    if(this.formGroup.valid){
      switch(this.data.mode){
        case Mode.insert:
          this.newInvoice().then(this.closeDialog);
          break;
        case Mode.update:
          this.updateInvoice().then(this.closeDialog);
          break;
        case Mode.delete:
          this.deleteInvoice().then(this.closeDialog);
          break;
        case Mode.view:
          this.dialogRef.close();
          break;
      }
    }else{
      for( const control in this.formGroup.controls ){
        if( this.formGroup.controls[control].errors ){
          const errors = this.formGroup.controls[control].errors;
          for ( const error in errors)
            console.error(`Error: ${errors[error]}`)
        }
      }      
    }
  }

  closeDialog = () => {
    this.dialogRef.close(this.formGroup.value);
  }

  newInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.invoiceService.newInvoice$(this.building.buildingsId, this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  updateInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.invoiceService.updateInvoice$(this.building.buildingsId, this.formGroup.value)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

  deleteInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.subscription.add(
          this.invoiceService.deleteInvoice$(this.building.buildingsId, this.invoice.invoicesId)
          .subscribe(
            resolve,
            reject
          )
        )
      }
    )
  }

}
