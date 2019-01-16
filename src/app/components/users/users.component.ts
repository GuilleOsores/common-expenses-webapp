import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs'

import { Mode } from '../../utils/utils'

import { UsersService, AuthService } from '../../services';
import { User, Permission } from 'common-expenses-libs/libs';
import { UsersDetailComponent } from '../users-detail/users-detail.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private mode: Mode;  
  users: MatTableDataSource<User>;
  selectedBuilding: any;
  subscription: Subscription = new Subscription();
  permission: Permission;
  
  displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private usersService: UsersService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
      this.authService.getPermission('Users').subscribe(
        (permissions) => {console.log(`respuesta de permisos: ${JSON.stringify(permissions)}`)
          this.permission = permissions.find(
            (permission) => permission.program === 'Users'
          );
          //this.permission = permission[0];
        }
      );
    }

  ngOnInit () {
    
    this.getUsers();
  }

  ngOnDestroy (){
    this.subscription.unsubscribe();
  }

  applyFilter (filter: string){
    this.users.filter = filter;
  }

  getUsers = () => {
    const subscription = this.usersService.getUsers$()
    .subscribe(
      (users) => { this.users = new MatTableDataSource(users); },
      error => {console.log('error::::');  console.log(error); }
    )
    this.subscription.add(subscription);
  }

  createUser = () => {
    const dialogRef = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getUsers
    )
  }

  editUser = (user) => {
    const dialogRef = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.update,
          user
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getUsers
    )
  }

  deleteUser = (user) => {
    const dialogRef = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.delete,
          user
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      this.getUsers
    )
  }

  viewUser = (user) => {
    const dialogRef = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.view,
          user
        }
      }
    );
  }
}
