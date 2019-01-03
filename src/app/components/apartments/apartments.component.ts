import { Component, OnInit } from '@angular/core';

import { ApartmentsService } from '../../services/apartments/apartments.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  constructor (private apartmentsService: ApartmentsService) { }

  ngOnInit () {
  }

  getApartments (){
    return this.apartmentsService.getApartments().subscribe(
      value => console.log
      , err => console.log
    );
  }

}
