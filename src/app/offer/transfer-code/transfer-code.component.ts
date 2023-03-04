import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-transfer-code',
  templateUrl: './transfer-code.component.html',
})
export class TransferCodeComponent implements OnInit {
  
  data: any = [];
  franchise_id
  loading_list:any = false;
  mode:any;
  savingData = false;
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<TransferCodeComponent>) {
      
      this.data.scanned_coupon = lead_data.scanned_coupon; 
      this.data.offer_id = lead_data.offer_id; 
      
    }
    ngOnInit() {
      this.getOffer();
    }
    offers:any = [];
    getOffer() {
      this.loading_list = true;
      this.db.post_rqst(  { 'offer_id' : this.data.offer_id} , 'offer/offerForCoupon')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.offers = d.offer;
      });
    }
    offer:any = {};
    addoffer(form:any)
    {
      this.savingData = true;
      this.db.post_rqst( { 'offer' : this.offer , 'scanned_coupon' : this.data.scanned_coupon, 'login_id': this.db.datauser.id  }, 'offer/couponTransfer')
      .subscribe( d => {
        this.savingData = false;
        this.dialogRef.close(true);
        this.dialog.success( 'Offer successfully Transfer');
        console.log( d );
      });
    }

    onNoClick(): void{
      this.dialogRef.close();
      }
  }
  