import { NgModule } from '@angular/core';

import 
{ 
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatExpansionModule,
  MatRadioModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatRippleModule

  
}from '@angular/material';

@NgModule({
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRippleModule


  ],
  
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRippleModule
  ],
})

export class MaterialModule  { }
export class DatepickerModule {}