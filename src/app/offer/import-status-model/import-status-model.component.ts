import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-import-status-model',
  templateUrl: './import-status-model.component.html',
})
export class ImportStatusModelComponent implements OnInit {
  
  exist_coupon: any = [];
  loading_list:any = false;
  karigar:any =[];
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<ImportStatusModelComponent>) {

      this.exist_coupon = lead_data.exist_coupon; 
      console.log( this.exist_coupon );
      
    }
    ngOnInit() {

    }
  }
  