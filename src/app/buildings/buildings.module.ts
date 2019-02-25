import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BuildingsRoutingModule } from './buildings-routing.module';

import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingsListComponent } from './buildings-list/buildings-list.component';
import { BuildingDetailComponent } from './building-detail/building-detail.component';
import { ApartmentsComponent } from './apartment/apartments/apartments.component';
import { ApartmentDetailComponent } from './apartment/apartment-detail/apartment-detail.component';
import { InvoicesComponent } from './invoice/invoices/invoices.component';
import { InvoicesDetailComponent } from './invoice/invoices-detail/invoices-detail.component';

@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingDetailComponent,
    BuildingsListComponent,
    ApartmentsComponent,
    ApartmentDetailComponent,
    InvoicesComponent,
    InvoicesDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    BuildingsRoutingModule
  ],
  entryComponents: [
    BuildingDetailComponent,
    ApartmentDetailComponent,
    InvoicesDetailComponent
  ]
})
export class BuildingsModule { }
