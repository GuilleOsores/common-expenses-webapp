import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { BuildingDetailComponent } from './components/building-detail/building-detail.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApartmentDetailComponent } from './src/app/components/apartment-detail/apartment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    ApartmentsComponent,
    BuildingDetailComponent,
    SidenavComponent,
    ApartmentDetailComponent,
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
  entryComponents: [BuildingDetailComponent]
})
export class AppModule { }
