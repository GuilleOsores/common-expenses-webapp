import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from 'common-expenses-libs/libs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = environment.api.invoices;

  constructor (private httpClient: HttpClient) {
  }

  setBuidingId (buildingId: string){
    this.url = this.url.replace(':buildingId', buildingId);
  }

  getInvoices$ (buildingId: string) {
    this.setBuidingId(buildingId);
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <Invoice[]>res.Items)
    );
  }

  getInvoiceById$ (buildingId: string, apartmentId: string){
    this.setBuidingId(buildingId);
    return this.httpClient.get<any>(this.url + '/' + apartmentId)
    .pipe(
      map( res => <Invoice>res.Items[0])
    );
  }

  newInvoice$ (buildingId: string, invoice: Invoice) {
    this.setBuidingId(buildingId);
    return this.httpClient.post<any>(this.url, invoice)
    .pipe(
      map( res => <Invoice>res.Attributes)
    );
  }

  updateInvoice$ = (buildingId: string, invoice: Invoice) => {
    this.setBuidingId(buildingId);
    return this.httpClient.put<any>(this.url + '/' + invoice.invoicesId, invoice)
    .pipe(
      map( res => <Invoice>res.Attributes)
    );
  }

  deleteInvoice$ (buildingId: string, id: string) {
    this.setBuidingId(buildingId);
    return this.httpClient.delete<Invoice>(this.url + '/' + id);
  }
}
