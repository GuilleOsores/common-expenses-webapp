import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'

//import { Building } from '../../../../../common-expenses-libs/libs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  private url = environment.api.buildings;

  constructor (private httpClient: HttpClient) {
  }

  getBuildings (){
    return this.httpClient.get(this.url);
  }

  getBuildingById (id: any){
    return this.httpClient.get(this.url + '/' + id);
  }

  newBuilding (building: any){
    return this.httpClient.post(this.url, building);
  }

  updateBuilding (building: any){
    return this.httpClient.put(this.url + '/' + building.buildingsId, building);
  }

  deleteBuilding (id: any){
    return this.httpClient.delete(this.url + '/' + id);
  }
}
