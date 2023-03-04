import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-karigar-balance-model',
  templateUrl: './karigar-balance-model.component.html',
})
export class KarigarBalanceModelComponent implements OnInit {

  
  data: any = [];
  loading_list:any = false;
  balance:any =[];
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<KarigarBalanceModelComponent>) {

      this.data.id = lead_data.id; 
      // this.data.gift_id = lead_data.gift_id; 
    }
    ngOnInit() {
      this.getProduct();
    }
    product:any = {};
    karigar_referral_point:any =[];
    getProduct() {
      this.loading_list = true;
      this.db.post_rqst(  {'karigar_id' : this.data.id } , 'karigar/getKarigarOfferBalance')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.balance = d.offer;
        this.karigar_referral_point = d.karigar_point;
      });
    }
  }
  