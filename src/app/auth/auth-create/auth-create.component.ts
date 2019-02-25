import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-create',
  templateUrl: './auth-create.component.html',
  styleUrls: ['./auth-create.component.scss']
})
export class AuthCreateComponent implements OnInit, OnDestroy {

  private formGroup: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      userId: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onSubmit () {
    if(this.formGroup.valid){
      this.subscription.add(      
        this.authService.createUser(
          this.formGroup.controls.userId.value,
          this.formGroup.controls.user.value,
          this.formGroup.controls.password.value
        ).subscribe(
          (res) => {
            console.dir(res);
          }
        )  
      )
    }
  }
}
