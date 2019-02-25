import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Service } from 'common-expenses-libs/libs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = environment.api.services;

  constructor (private httpClient: HttpClient) {
  }

  getServices$ (){
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <Service[]>res.Items)
    );
  }

  getServiceById$ (id: string){
    return this.httpClient.get<any>(this.url + '/' + id)
    .pipe(
      map( res => <Service>res.Items[0])
    );
  }

  newService$ (service: Service){
    return this.httpClient.post<any>(this.url, service)
    .pipe(
      map( res => <Service>res.Attributes)
    );
  }

  updateService$ = (service: Service) => {
    return this.httpClient.put<any>(this.url + '/' + service.servicesId, service)
    .pipe(
      map( res => <Service>res.Attributes)
    );
  }

  deleteService$ (id: string){
    return this.httpClient.delete<Service>(this.url + '/' + id);
  }
}
