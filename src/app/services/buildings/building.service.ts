import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Building } from 'common-expenses-libs/libs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  private url = environment.api.buildings;

  constructor (private httpClient: HttpClient) {
  }

  getBuildings$ (){
    return this.httpClient.get<any>(this.url)
    .pipe(
      map( res => <Building[]>res.Items)
    );
  }

  getBuildingById$ (id: string){
    return this.httpClient.get<any>(this.url + '/' + id)
    .pipe(
      map( res => <Building>res.Items[0])
    );
  }

  newBuilding$ (building: Building){
    return this.httpClient.post<any>(this.url, building)
    .pipe(
      map( res => <Building>res.Attributes)
    );
  }

  updateBuilding$ = (building: Building) => {
    return this.httpClient.put<any>(this.url + '/' + building.buildingsId, building)
    .pipe(
      map( res => <Building>res.Attributes)
    );
  }

  deleteBuilding$ (id: string){
    return this.httpClient.delete<Building>(this.url + '/' + id);
  }
}
