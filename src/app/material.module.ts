import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatTooltipModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }
