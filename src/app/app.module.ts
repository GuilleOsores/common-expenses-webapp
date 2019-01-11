import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  ApartmentDetailComponent,
  ApartmentsComponent,
  BuildingDetailComponent,
  BuildingsComponent,
  InvoicesComponent,
  InvoicesDetailComponent,
  ServicesComponent,
  ServicesDetailComponent,
  SidenavComponent,
} from './components';
import { RolesComponent } from './components/roles/roles.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    ApartmentsComponent,
    BuildingDetailComponent,
    SidenavComponent,
    ApartmentDetailComponent,
    InvoicesComponent,
    InvoicesDetailComponent,
    ServicesDetailComponent,
    ServicesComponent,
    RolesComponent,
    RoleDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BuildingDetailComponent,
    ApartmentDetailComponent,
    ServicesDetailComponent,
    InvoicesDetailComponent,
    RoleDetailComponent
  ]
})
export class AppModule { }
