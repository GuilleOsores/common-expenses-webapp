import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Mode } from '../../utils/utils'

import { Invoice, Building } from '../../classes';
import { InvoiceService } from '../../services'

@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent implements OnInit {

  private formGroup: FormGroup;
  private formControlId: FormControl;
  private formControlYear: FormControl;
  private formControlMonth: FormControl;
  private formControlAmmount: FormControl;
  private formControlDueDate: FormControl;
  private formControlPaidDate: FormControl;
  private formControlService: FormControl;
  private Mode = Mode;
  private invoice: Invoice;
  private building: Building;

  constructor(
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<InvoiceService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.building = data.building;
    this.invoice = data.invoice;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      invoicesId: this.formControlId = new FormControl( '' ),
      year: this.formControlYear = new FormControl( '', Validators.required ),
      month: this.formControlMonth = new FormControl( '', Validators.required ),
      ammount: this.formControlAmmount = new FormControl( '', Validators.required ),
      dueDate: this.formControlDueDate = new FormControl( '', Validators.required ),
      paidDate: this.formControlPaidDate = new FormControl( '' ),
      service: this.formControlService = new FormControl( '' ),
    });

    if( !((<Mode>this.data.mode) === Mode.insert)){
      this.getInvoiceById()
      .then( 
        (invoice) => {          
          console.log(JSON.stringify(invoice));
          this.formControlId.setValue(invoice.invoicesId);
          this.formControlYear.setValue(invoice.year);
          this.formControlMonth.setValue(invoice.month);
          this.formControlAmmount.setValue(invoice.ammount);
          this.formControlDueDate.setValue(invoice.dueDate);
          this.formControlPaidDate.setValue(invoice.paidDate);
          this.formControlService.setValue(invoice.service);
        }
      );
    }    
  }

  getInvoiceById = (): Promise<Invoice> => {
    return new Promise(
      (resolve, reject) => {
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
        );
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
    }
  }

  closeDialog = () => {
    this.dialogRef.close(this.formGroup.value);
  }

  newInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.invoiceService.newInvoice$(this.building.buildingsId, this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  updateInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.invoiceService.updateInvoice$(this.building.buildingsId, this.formGroup.value)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

  deleteInvoice (): Promise<Invoice> {
    return new Promise(
      (resolve, reject) => {
        this.invoiceService.deleteInvoice$(this.building.buildingsId, this.invoice.invoicesId)
        .subscribe(
          resolve,
          reject
        );
      }
    )
  }

}
