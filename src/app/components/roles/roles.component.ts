import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Role } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils';

import { RolesService, AuthService } from '../../services';
import { RoleDetailComponent } from '../role-detail/role-detail.component'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  private mode: Mode;  
  private roles: MatTableDataSource<Role>;
  private subscription: Subscription = new Subscription();
  
  private displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private roleService: RolesService,
    private authService: AuthService,
    private matDialog: MatDialog,
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
    );
    this.subscription.add(subscription);
  }

  createRole = () => {
    const subscription = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    )
    .afterClosed().subscribe(
      this.getRoles
    );
    this.subscription.add(subscription);
  }

  editRole = (role: Role) => {
    const subscription = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.update,
          role
        }
      }
    )
    .afterClosed().subscribe(
      this.getRoles
    );
    this.subscription.add(subscription);
  }

  deleteRole = (role) => {
    const subscription = this.matDialog.open(
      RoleDetailComponent,
      {
        data: {
          mode: Mode.delete,
          role
        }
      }
    )
    .afterClosed().subscribe(
      this.getRoles
    );
    this.subscription.add(subscription);
  }

  viewRole = (role: Role) => {
    this.matDialog.open(
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
