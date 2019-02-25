import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { User } from 'common-expenses-libs/libs';

import { Mode } from '../../utils/utils';

import { UsersService } from '../users.service';
import { AuthService } from '../../auth/auth.service';
import { UsersDetailComponent } from '../users-detail/users-detail.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private mode: Mode;  
  private users: MatTableDataSource<User>;
  private subscription: Subscription = new Subscription();
  
  private displayedColumns: string[] = ['view', 'edit', 'delete', 'name'];

  constructor (
    private usersService: UsersService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) {
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
    const subscription = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.insert
        }
      }
    )
    .afterClosed().subscribe(
      this.getUsers
    );
    this.subscription.add(subscription);
  }

  editUser = (user) => {
    const subscription = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.update,
          user
        }
      }
    )
    .afterClosed().subscribe(
      this.getUsers
    );
    this.subscription.add(subscription);
  }

  deleteUser = (user) => {
    const subscription = this.matDialog.open(
      UsersDetailComponent,
      {
        data: {
          mode: Mode.delete,
          user
        }
      }
    )
    .afterClosed().subscribe(
      this.getUsers
    );
    this.subscription.add(subscription);
  }

  viewUser = (user) => {
    this.matDialog.open(
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
