import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { Building } from '../../../../../common-expenses-libs/libs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  private url = 'http://127.0.0.1:8080/buildings';

  constructor (private httpClient: HttpClient) {
  }
//<Building[]>
  getBuildings (){
    return this.httpClient.get(this.url);
  }
}
