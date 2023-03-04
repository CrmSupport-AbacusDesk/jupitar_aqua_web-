import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { GiftRedeemModuleComponent } from '../gift-redeem-module/gift-redeem-module.component';
import * as moment from 'moment';

@Component({
    selector: 'app-coupon-summary-modle',
    templateUrl: './coupon-summary-modle.component.html',
})
export class CouponSummaryModleComponent implements OnInit {
    
    data:any=[];
    loading_list:any = false;
    coupon_data:any =[];
    available_coupon:any;
    total_coupon:any;
    total_coupon_value:any;
    available_coupon_value:any;
    start:any = 0;
    pagelimit:any = 50;
    pagenumber:any='';
    total_page:any='';
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,@Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef:MatDialogRef<GiftRedeemModuleComponent> ) 
    { 
        this.data = lead_data.offer_data; 
        console.log(this.data);
    }
    
    ngOnInit() 
    {
        this.getCouponSummary(this.pagelimit,this.start,'');
    }
    
    product:any = {};
    getCouponSummary(pagelimit:any=50,start:any=0,action) 
    {
        this.pagelimit = pagelimit;
        this.start = start;
        this.loading_list = true;
        this.db.post_rqst(  {'offer_data' : this.data,'start':this.start,'pagelimit':this.pagelimit} , 'offer/getCouponSummary')
        .subscribe( d => {
            this.loading_list = false;
            console.log( d );
            this.coupon_data = d.Coupon_code_summary.coupon_codes;
            this.available_coupon = d.Coupon_code_summary.avialable_coupon;
            this.total_coupon = d.Coupon_code_summary.total_coupon;
            this.total_coupon_value = d.Coupon_code_summary.total_coupon_value;
            this.available_coupon_value = d.Coupon_code_summary.avialable_coupon_value;
            
            this.total_page = Math.ceil(this.total_coupon/this.pagelimit);
            this.pagenumber = (this.start/this.pagelimit)+1;
        });
    }
    
    exportCouponList()
    {
        let codes = [];
        let date
        this.loading_list = true;
        this.db.post_rqst(  {'offer_data' : this.data,'start':0,'pagelimit':0} , 'offer/getCouponSummary')
        .subscribe( d => {
            this.loading_list = false;
            console.log( d );
            this.coupon_data = d.Coupon_code_summary.coupon_codes;
            for(let i=0;i<this.coupon_data.length;i++)
            {
                if(this.coupon_data[i].scan_date!= '0000-00-00 00:00:00')
                {
                    date = moment(this.coupon_data[i].scan_date).format('DD-MM-YYYY');
                }
                else{
                    date = 'N/A'
                }
                codes.push({'S.No':i+1,'Date':this.coupon_data[i].date_created,'Coupon Code':this.coupon_data[i].coupon_code, 'Coupon Value':this.coupon_data[i].coupon_value,'Used By': this.coupon_data[i].first_name ,'Used Date':date});
            }
            this.db.exportAsExcelFile(codes, 'Coupon Code Summary List ');
        });
        
    }
    
}
