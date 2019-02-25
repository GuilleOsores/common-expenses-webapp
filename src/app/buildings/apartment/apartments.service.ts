import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apartment } from 'common-expenses-libs/libs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  private url = environment.api.apartments;

  constructor(private httpClient: HttpClient) { }

  setBuidingId (buildingId: string) {
    this.url = this.url.replace(':buildingId', buildingId);
  }

  getApartments$ (buildingId: string) {
    this.setBuidingId(buildingId);
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <Apartment[]>res.Items)
    );
  }

  getApartmentById$ (buildingId: string, apartmentId: string) {
    this.setBuidingId(buildingId);
    return this.httpClient.get<any>(this.url + '/' + apartmentId)
    .pipe(
      map( res => <Apartment>res.Items[0])
    );
  }

  newApartment$ (buildingId: string, apartment: any){
    this.setBuidingId(buildingId);
    return this.httpClient.post<any>(this.url, apartment)
    .pipe(
      map( res => <Apartment>res.Attributes)
    );
  }

  updateApartment$ (buildingId: string, apartment: any){
    this.setBuidingId(buildingId);
    return this.httpClient.put<any>(this.url + '/' + apartment.apartmentsId, apartment)
    .pipe(
      map( res => <Apartment>res.Attributes)
    );
  }

  deleteApartment$ (buildingId: string, apartmentId: string){
    this.setBuidingId(buildingId);
    return this.httpClient.delete<Apartment>(this.url + '/' + apartmentId);
  }
}
