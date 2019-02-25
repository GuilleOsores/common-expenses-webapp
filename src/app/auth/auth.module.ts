import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthCreateComponent } from './auth-create/auth-create.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
