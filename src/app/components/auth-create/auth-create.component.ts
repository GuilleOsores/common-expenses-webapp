import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../../services';

@Component({
  selector: 'app-auth-create',
  templateUrl: './auth-create.component.html',
  styleUrls: ['./auth-create.component.scss']
})
export class AuthCreateComponent implements OnInit {

  private formGroup: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AppComponent>
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      userId: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
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