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
    InvoicesDetailComponent
  ]
})
export class AppModule { }
