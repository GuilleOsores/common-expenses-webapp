import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppComponent } from '../../app.component';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private newUser: boolean = false;
  private subscription: Subscription = new Subscription();
  private error: Boolean = false;

  constructor (
    private authService: AuthService, 
    private router: Router,
    ) { }

  ngOnInit() {
    if(this.authService.needsLogin()){
      this.formGroup = new FormGroup({
        user: new FormControl('guille', Validators.required),
        password: new FormControl('1234', Validators.required),
      })
    }else{
      this.router.navigateByUrl('/buildings');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get form(){
    return this.formGroup.controls;
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
              this.router.navigateByUrl('/buildings');
            }else{
              this.error = true;
            }
          },
          err => {
            console.dir('en login.component err: ', err);
            this.error = true;
          }
        )
      )
    }
  }

}
