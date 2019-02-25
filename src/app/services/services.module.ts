import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services/services.component';
import { ServicesDetailComponent } from './services-detail/services-detail.component';

@NgModule({ 
  declarations: [
    ServicesComponent,
    ServicesDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ServicesRoutingModule
  ],
  entryComponents: [
    ServicesDetailComponent
  ]
})
export class ServicesModule { }
