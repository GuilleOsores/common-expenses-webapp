import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AppComponent } from '../../app.component';
import { AuthService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private newUser: boolean;
  private subscription: Subscription = new Subscription();

  constructor (
    private authService: AuthService, 
    private router: Router,
    public dialogRef: MatDialogRef<AppComponent>
    ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit () {
    if (this.formGroup.valid){
      this.subscription.add(
        this.authService.login(
          this.formGroup.value.user,
          this.formGroup.value.password
        )
        .subscribe(
          logged => {
            if(logged){
              this.dialogRef.close();
            }
          }
        )
      )
    }
  }

}
