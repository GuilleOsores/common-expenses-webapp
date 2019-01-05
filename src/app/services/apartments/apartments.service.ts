import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  private url = environment.api.apartments;

  constructor(private httpClient: HttpClient) { }

  setBuidingId (buildingId: string){
    this.url = this.url.replace(':buildingId', buildingId)
  }

  getApartments (buildingId: string){
    this.setBuidingId(buildingId);
    return this.httpClient.get(this.url);
  }

  getApartmentById (buildingId: string, apartmentId: string){
    this.setBuidingId(buildingId);
    return this.httpClient.get(this.url + '/' + apartmentId);
  }

  newApartment (buildingId: string, apartment: any){
    this.setBuidingId(buildingId);
    return this.httpClient.post(this.url, apartment);
  }

  updateApartment (buildingId: string, apartment: any){
    this.setBuidingId(buildingId);
    return this.httpClient.put(this.url + '/' + apartment.apartmentsId, apartment);
  }

  deleteApartment (buildingId: string, apartmentId: string){
    this.setBuidingId(buildingId);
    return this.httpClient.delete(this.url + '/' + apartmentId);
  }
}
