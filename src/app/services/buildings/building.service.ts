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

  getBuildingById (id: any){
    return this.httpClient.get(this.url + '/' + id);
  }

  newBuilding (building: any){
    return this.httpClient.post(this.url, building);
  }

  updateBuilding (id: any, building: any){
    return this.httpClient.put(this.url + '/' + id, building);
  }

  deleteBuilding (id: any){
    return this.httpClient.get(this.url + '/' + id);
  }
}
