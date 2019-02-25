import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UsersRoutingModule
  ],
  entryComponents: [
    UsersDetailComponent
  ]
})
export class UsersModule { }
