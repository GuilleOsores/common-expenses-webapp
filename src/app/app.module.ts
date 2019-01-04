import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { BuildingDetailComponent } from './components/building-detail/building-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    ApartmentsComponent,
    BuildingDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
    //MatFormFieldModule,
    //MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
