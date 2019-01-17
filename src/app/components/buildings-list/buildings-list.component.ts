import { Component, OnInit, Input, OnChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services';
import { Building, Permission } from 'common-expenses-libs/libs';

@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.css']
})
export class BuildingsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() buildings: Building[];
  @Input() filter: string;
  @Output() eventViewApartments: EventEmitter<Building> = new EventEmitter<Building>();
  @Output() eventViewInvoices: EventEmitter<Building> = new EventEmitter<Building>();
  @Output() eventView: EventEmitter<Building> = new EventEmitter<Building>();
  @Output() eventCreate: EventEmitter<Building> = new EventEmitter<Building>();
  @Output() eventEdit: EventEmitter<Building> = new EventEmitter<Building>();  
  @Output() eventDelete: EventEmitter<Building> = new EventEmitter<Building>();
  

  private mtdsBuildings: MatTableDataSource<Building> = new MatTableDataSource();
  private displayedColumns: string[] = ['launch', 'launchInvoices', 'view', 'edit', 'delete', 'name', 'address'];
  subscription: Subscription = new Subscription();
  permission: Permission;

  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.mtdsBuildings.data = this.buildings;

    this.subscription.add(
      this.authService.getPermission('Buildings').subscribe(
        (permission) => {
          (permission) => permission.program === 'Buildings'
            this.permission = permission[0];
        }
      )
    );
  }

  ngOnChanges() {
    this.mtdsBuildings.data = this.buildings;
    this.mtdsBuildings.filter = this.filter;
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  viewApartments (building: Building) {
    this.eventViewApartments.emit(building);
  }

  viewInvoices (building: Building) {
    this.eventViewInvoices.emit(building);
  }

  viewBuilding (building: Building) {
    this.eventView.emit(building);
  }

  createBuilding (building: Building) {
    this.eventCreate.emit(building);
  }

  editBuilding (building: Building) {
    this.eventEdit.emit(building);
  }

  deleteBuilding (building: Building) {
    this.eventDelete.emit(building);
  }

}
