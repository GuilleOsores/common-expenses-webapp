import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }
