import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
  declarations: [
    RolesComponent,
    RoleDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RolesRoutingModule
  ],
  entryComponents: [
    RoleDetailComponent
  ]
})
export class RolesModule { }
