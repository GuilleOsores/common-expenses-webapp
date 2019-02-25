import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'common-expenses';

  constructor (
    private authService: AuthService, 
    private router: Router,
    private matDialog: MatDialog
    ){
      
  }

  ngOnInit () {
    this.checkLogin();
  }

  checkLogin () {
    if (this.authService.needsLogin()){
      console.log('en checkLogin');
      this.router.navigateByUrl('/login');
    }
  }
}
