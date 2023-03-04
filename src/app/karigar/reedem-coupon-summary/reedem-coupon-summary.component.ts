import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
  selector: 'app-reedem-coupon-summary',
  templateUrl: './reedem-coupon-summary.component.html',
})
export class ReedemCouponSummaryComponent implements OnInit {
  
  id:any;
  loading_list:any = false;
  coupon_data:any =[];
  available_coupon:any;
  total_coupon:any;
  total_coupon_value:any;
  available_coupon_value:any;

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<ReedemCouponSummaryComponent>) 
    { 
      this.id = lead_data.id; 
    }
    
    ngOnInit() 
    {
      this.getCouponSummary();
    }
    
    product:any = {};
    getCouponSummary() 
    {
      this.loading_list = true;
      this.db.post_rqst(  {'reedem_id' : this.id } , 'karigar/getReedemCouponSummary')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.coupon_data = d.getData.data;
      });
    }
    
  }
  