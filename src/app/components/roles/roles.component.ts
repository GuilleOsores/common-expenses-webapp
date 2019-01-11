import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs'

import { Mode } from '../../utils/utils'

import { RolesService } from '../../services';
import { Role } from 'common-expenses-libs';
import { RoleDetailComponent } from '../role-detail/role-detail.component'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  private mode: Mode;  
  roles: MatTableDataSource<Role>;
  selectedBuilding: any;
  subscription: Subscription = new Subscription();
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private roleService: RolesService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit () {
    this.getRoles();
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

  applyFilter (filter: string){
    this.roles.filter = filter;
  }

  getRoles = () => {
    const subscription = this.roleService.getRoles$()
    .subscribe(
      (roles) => { this.roles = new MatTableDataSource(roles); },
      error => {console.log('error::::');  console.log(error); }
    )
    this.subscription.add(subscription);
  }

  createRole = () => {
    const dialogRef = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getRoles
    )
  }

  editRole = (role: Role) => {
    const dialogRef = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.update,
          role
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getRoles
    )
  }

  deleteRole = (role) => {
    const dialogRef = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.delete,
          role
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      this.getRoles
    )
  }

  viewRole = (role: Role) => {
    const dialogRef = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.view,
          role
        }
      }
    );
  }

}
