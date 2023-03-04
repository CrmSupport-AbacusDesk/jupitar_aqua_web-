import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-gift-redeem-module',
  templateUrl: './gift-redeem-module.component.html',
})
export class GiftRedeemModuleComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  karigar:any =[];
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<GiftRedeemModuleComponent>) {

      this.data.offer_id = lead_data.offer_id; 
      this.data.gift_id = lead_data.gift_id; 
    }
    ngOnInit() {
      this.getProduct();
    }
    product:any = {};
    getProduct() {
      this.loading_list = true;
      this.db.post_rqst(  {'offer_id' : this.data.offer_id ,'gift_id' : this.data.gift_id} , 'offer/giftRedeem')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.karigar = d.karigar;
      });
    }
  }
  