import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  private url = 'http://127.0.0.1:8080/buildings/1/apartments';

  constructor(private httpClient: HttpClient) { }

  getApartments (){
    return this.httpClient.get(this.url);
  }
}
