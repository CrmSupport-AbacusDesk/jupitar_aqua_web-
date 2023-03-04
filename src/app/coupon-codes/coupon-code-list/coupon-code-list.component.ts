import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {DialogComponent} from '../../dialog/dialog.component';
import { MatDialog, MatDatepicker } from '@angular/material';
import { CouponSummaryModleComponent } from 'src/app/offer/coupon-summary-modle/coupon-summary-modle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorage } from 'src/app/_services/SessionService';
import { CouponCodeModalComponent } from '../coupon-code-modal/coupon-code-modal.component';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';
import { ManualAssignModelComponent } from '../manual-assign-model/manual-assign-model.component';


@Component({
    selector: 'app-coupon-code-list',
    templateUrl: './coupon-code-list.component.html',
})
export class CouponCodeListComponent implements OnInit {
    
    loading_list = false;
    coupon: any = [];
    total_coupon = 0;
    
    last_page: number ;
    current_page = 1;
    search: any = '';
    searchData = true;
    filter:any = {};
    filtering : any = false;
    redeem_coupon:any=[];
    perPage=0;
    
    coupon_all:any =0;
    coupon_available_count : any = 0;
    coupon_scanned_count : any = 0;
    coupon_redeem_count : any = 0;
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage, public dialog:DialogComponent, public alrt:MatDialog ) {}
    
    mode:any='2';
    ngOnInit() {
        this.mode='1';
        this.getAvailableCoupanList('');
        this.filter.status = '';
    }
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    
    redirect_previous1() {
        this.current_page--;
        this.getAvailableCoupanList('');
    }
    redirect_next1() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getAvailableCoupanList('');
    }
    
    redirect_previous2() {
        this.current_page--;
        this.getScannedList('');
    }
    redirect_next2() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getScannedList('');
    }
    
    redirect_previous3() {
        this.current_page--;
        this.getRedeemList('');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getRedeemList('');
    }
    
    redirect_previous4() {
        this.current_page--;
        this.getcodeSummaryist('');
    }
    redirect_next4() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getcodeSummaryist('');
    }
    
    avialable_coupon_count:any=0;
    redeem_coupon_count:any=0;
    sccaned_coupon_count:any=0;
    sccaned_coupon_count_retailer:any=0;
    total_available_coupon_value:any=0;
    sr_no:any=0;
    
    current1()
    {
        this.current_page = 1;
        this.getAvailableCoupanList('');
    }
    last1()
    {
        this.current_page = this.last_page;
        this.getAvailableCoupanList('');
    }
    current2()
    {
        this.current_page = 1;
        this.getScannedList('');
    }
    last2()
    {
        this.current_page = this.last_page;
        this.getScannedList('');
    }
    current3()
    {
        this.current_page = 1;
        this.getRedeemList('');
    }
    last3()
    {
        this.current_page = this.last_page;
        this.getRedeemList('');
    }
    current4()
    {
        this.current_page = 1;
        this.getcodeSummaryist('');
    }
    last4()
    {
        this.current_page = this.last_page;
        this.getcodeSummaryist('');
    }
    
    avialableValue:any
    getAvailableCoupanList(action) 
    {
        this.loading_list = true;
        this.filtering = false;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.scan_date = this.filter.scan_date  ? this.db.pickerFormat(this.filter.scan_date) : '';
        this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
        if( this.filter.date || this.filter.scan_date || this.filter.end_date  || this.filter.search || this.filter.coupon_code || this.filter.offer_title || this.filter.points)this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.filter ={};
        }
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/couponAvailableList?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            
            this.current_page = d.avialable_coupon.current_page;
            this.last_page = d.avialable_coupon.last_page;
            this.total_coupon =d.avialable_coupon.total;
            this.coupon = d.avialable_coupon.data;
            this.avialableValue = d.total_points;
            this.avialable_coupon_count = d.avialable_coupon.total;
            this.redeem_coupon_count = d.coupon_redeem_count;
            this.sccaned_coupon_count = d.coupon_scanned_count;

            this.perPage = d.avialable_coupon.per_page;
            // console.log( this.perPage);
            
            // commented
            // this.total_available_coupon_value = d.total_available_coupon_value.total_coupon_value;
            this.sr_no = this.current_page - 1;
            this.sr_no = this.sr_no * this.perPage;    
            console.log(this.sr_no);
              
        });
    }
    
    exportAvailableCouponList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'offer/exportAvailableCouponList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'/app/uploads/exports/Available-coupon-code.csv';
            console.log(d);
        });
    }
    scanned_coupon:any=[];
    scanValue:any;
    total_scanned_coupon:any={};
    total_scanned_coupon_value:any = 0;
    getScannedList(action) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.scan_date = this.filter.scan_date  ? this.db.pickerFormat(this.filter.scan_date) : '';
        this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
        if( this.filter.date || this.filter.scan_date || this.filter.end_date  || this.filter.search || this.filter.coupon_code || this.filter.offer_title || this.filter.points || this.filter.mobile || this.filter.used_by)this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.filter ={};
        }
        
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/couponScannedListKarigar?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            this.scanValue = d.total_points;
            this.current_page = d.scanned_coupon.current_page;
            this.last_page = d.scanned_coupon.last_page;
            this.total_scanned_coupon =d.scanned_coupon.total;
            this.scanned_coupon = d.scanned_coupon.data;
            this.sccaned_coupon_count = d.scanned_coupon.total;
            this.redeem_coupon_count = d.coupon_redeem_count;
            this.avialable_coupon_count = d.coupon_available_count;


            
            // this.total_scanned_coupon_value = d.total_scanned_coupon_value.total_coupon_value;
        });
    }

    getScannedListRetailer(action) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.scan_date = this.filter.scan_date  ? this.db.pickerFormat(this.filter.scan_date) : '';
        this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
        if( this.filter.date || this.filter.scan_date || this.filter.end_date  || this.filter.search || this.filter.coupon_code || this.filter.offer_title || this.filter.points || this.filter.mobile || this.filter.used_by)this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.filter ={};
        }
        
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/couponScannedListRetailer?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            this.current_page = d.scanned_coupon.current_page;
            this.last_page = d.scanned_coupon.last_page;
            this.total_scanned_coupon =d.scanned_coupon.total;
            this.scanned_coupon = d.scanned_coupon.data;
            this.sccaned_coupon_count_retailer = d.scanned_coupon.total;
            this.redeem_coupon_count = d.coupon_redeem_count;
            this.avialable_coupon_count = d.coupon_available_count;
            // this.total_scanned_coupon_value = d.total_scanned_coupon_value.total_coupon_value;
        });
    }
    exportScannedCouponList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'offer/exportScannedCouponList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'app/uploads/exports/scanned-coupon-list.csv';
            console.log(d);
        });
    }
    
    total_reddem_coupon:any={};
    total_reedem_coupon_value:any = 0;
    getRedeemList(action) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.scan_date = this.filter.scan_date  ? this.db.pickerFormat(this.filter.scan_date) : '';
        this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
        this.filter.redeem_date = this.filter.redeem_date  ? this.db.pickerFormat(this.filter.redeem_date) : '';
        if( this.filter.date || this.filter.scan_date || this.filter.end_date  || this.filter.search || this.filter.coupon_code || this.filter.offer_title || this.filter.points || this.filter.mobile || this.filter.used_by || this.filter.gift_title || this.filter.redeem_date)this.filtering = true;
        this.filter.mode = 0;

        if(action=='refresh')
        {
            this.filter ={};
        }
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/couponRedeemList?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            this.current_page = d.redeem_coupon.current_page;
            this.last_page = d.redeem_coupon.last_page;
            this.total_reddem_coupon =d.redeem_coupon.total;
            this.redeem_coupon = d.redeem_coupon.data;
            this.redeem_coupon_count = d.redeem_coupon.total;
            this.avialable_coupon_count = d.coupon_available_count;
            this.sccaned_coupon_count = d.coupon_scanned_count;
            this.total_reedem_coupon_value = d.total_reedem_coupon_value.total_coupon_value;
        });
    }
    exportRedeemCouponList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'offer/exportRedeemCouponList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'app/uploads/exports/redeem-coupon-list.csv';
            console.log(d);
        });
    }
    
    coupon_code_summary:any=[];
    getcodeSummaryist(action) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.filter ={};
        }
        this.db.post_rqst(  { 'filter': this.filter , 'login':this.db.datauser}, 'offer/Coupon_summary?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            this.coupon_code_summary = d.Coupon_code_summary.data;
            this.current_page = d.Coupon_code_summary.current_page;
            this.last_page = d.Coupon_code_summary.last_page;
        });
    }
    
    exportSummary()
    {
        let codes = [];
        for(let i=0;i<this.coupon_code_summary.length;i++)
        {
            codes.push({'S.No':i+1,'Date':this.coupon_code_summary[i].date_created,'Offer':'Offer Id #'+ this.coupon_code_summary[i].offer_id, 'Total Coupon':this.coupon_code_summary[i].total_coupon,'First coupon':this.coupon_code_summary[i].first_coupon_code,'Last coupon':this.coupon_code_summary[i].last_coupon_code});
        }
        this.db.exportAsExcelFile(codes, 'Coupon Code Summary');
    }
    
    coupon_summary(offer_data) 
    {   
        const dialogRef = this.alrt.open(CouponSummaryModleComponent,{
            width: '800px',
            data: {
                'offer_data' :offer_data,
            }
        });
        dialogRef.afterClosed().subscribe( r => {
            if( r ) this.getcodeSummaryist('');
        });
    }
    
    openDialog(): void {
        const dialogRef = this.alrt.open(CouponCodeModalComponent,{
            width: '500px',
            
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.getAvailableCoupanList('') ;
        });
    }
    
    openDatepicker(): void {
        const dialogRef = this.alrt.open(MastetDateFilterModelComponent, {
            width: '500px',
            data: {
                from:this.filter.date_from,
                to:this.filter.date_to
            }
        });
        
        dialogRef.afterClosed()
        .subscribe(result => {
            this.filter.date_from = result.from;
            this.filter.date_to = result.to;
            if(this.mode == "1")
            {
                this.getAvailableCoupanList("");
            }

            if(this.mode == "2")
            {
                this.getScannedList("");
            }

            if(this.mode == "3")
            {
                this.getRedeemList("");
            }

            if(this.mode == "4")
            {
                this.getcodeSummaryist("");
            }
        });
    }

    assign_coupon(id) {
        const dialogRef = this.alrt.open(ManualAssignModelComponent,{
            width: '500px',
            data: {
                'id' : id,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if(result){
                console.log(result);
                this.getAvailableCoupanList("");
            }
        });
    }


    deleteCoupon(id) {
        this.dialog.delete('Coupon').then((result) => {
        if(result) {
            this.db.post_rqst({'id': id}, 'app_master/delete_coupon').subscribe(d => {
            console.log(d);
            this.getAvailableCoupanList('');
            this.dialog.successfully();
            });
            }
        });
      } 
}
