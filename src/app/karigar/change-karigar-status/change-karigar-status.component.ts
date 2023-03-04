import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-change-karigar-status',
  templateUrl: './change-karigar-status.component.html',
})
export class ChangeKarigarStatusComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  mode:any;
  savingData = false;
  karigar_id;
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<ChangeKarigarStatusComponent>) {
      
      this.data.id = lead_data.id; 
      // this.data.gift_id = lead_data.gift_id; 
      
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.karigar_id = params['karigar_id'];
      });
    }
   
    offer:any = {};
    addoffer(form:any)
    {
      this.savingData = true;
      this.db.post_rqst( { 'status' : this.offer ,'id': this.data.id }, 'offer/redeemStatus')
      .subscribe( d => {
        this.savingData = false;
        this.router.navigate(['karigar-list']);
        this.dialogRef.close();
        this.dialog.success( 'Status successfully Change');
        console.log( d );

      });
    }
    onNoClick(): void{
      this.dialogRef.close(true);
      }
  }
  