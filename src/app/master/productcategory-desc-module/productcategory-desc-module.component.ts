import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
  selector: 'app-productcategory-desc-module',
  templateUrl: './productcategory-desc-module.component.html',
  styleUrls: ['./productcategory-desc-module.component.scss']
})
export class ProductcategoryDescModuleComponent implements OnInit {

  part_data: any = {};

  constructor(public dialog: DialogComponent, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductcategoryDescModuleComponent>) 
    { 
      console.log(data);
      this.part_data.id = data.id;
    }

  ngOnInit() {
  }

}
