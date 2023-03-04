import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDatepicker} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { ProductImageModuleComponent } from '../../master//product-image-module/product-image-module.component';
import {ChangeKarigarStatusComponent} from '../../karigar/change-karigar-status/change-karigar-status.component';
import { KarigarBalanceModelComponent } from '../../karigar/karigar-balance-model/karigar-balance-model.component';
import * as moment from 'moment';
import {ChangeStatusComponent} from '../../gift-gallery/change-status/change-status.component';
import { ReedemCouponSummaryComponent } from '../../karigar/reedem-coupon-summary/reedem-coupon-summary.component';
import { ReopenRemarkModleComponent } from 'src/app/offer/reopen-remark-modle/reopen-remark-modle.component';
import { BonusPointModelComponent } from '../../karigar/bonus-point-model/bonus-point-model.component';
import { ContractorSatusModalComponent } from 'src/app/contractor/contractor-satus-modal/contractor-satus-modal.component';

@Component({
  selector: 'app-dealer-detail',
  templateUrl: './dealer-detail.component.html',
  styleUrls: ['./dealer-detail.component.scss']
})
export class DealerDetailComponent implements OnInit {

  karigar_id:any='';
  page_number:any='';
  status:any='';
  loading_list = true;
  
  filtering : any = false;
  filter:any = {};
  last_page: number ;
  current_page = 1;
  search: any = '';
  previousUrl:any='';
  uploadUrl:any =''
  mindate :any = new Date(); 

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent, public alrt:MatDialog ) {
      console.log(router);
      this.uploadUrl = db.uploadUrl;

  }
  
  mode:any=1;
  ngOnInit() {
      this.route.params.subscribe(params => {
          this.karigar_id = params['dealer_id'];

          console.log(this.karigar_id);
          
          this.page_number = params['page'];
          this.status = params['status'];
          if (this.karigar_id) {
              this.getKarigarDetails();
              this.getReedamList();
              this.myPointList();
              this.getReferral();
              this.get_points_summry();
              this.getAssignPlumberList();
          }
      });
  }
  
  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
  }
  edit(){
      this.router.navigate(['/dealer-add/' +this.karigar_id]);
  }
  getData:any = {};
  total_wallet_points:any = 0;
  getKarigarDetails() {
      this.loading_list = true;
      this.db.post_rqst(  {'karigar_id':this.karigar_id}, 'karigar/karigarDetail')
      .subscribe(d => {
          this.loading_list = false;
          console.log(d);
          this.getData = d.karigar;
          if(this.getData.doa == '0000-00-00'){
            this.getData.doa = '';
        }
          this.getData.coupon_limit = d.karigar.manual_coupon_limit;
          this.total_wallet_points = parseInt(this.getData.balance_point) + parseInt(this.getData.referal_point_balance);
      });
  }
  
  
  
  karigarsSatus() {
      this.db.post_rqst({ 'status' : this.getData.status, 'id' : this.getData.id }, 'karigar/karigarStatus')
      .subscribe(d => {
          console.log(d);
          this.getKarigarDetails();
      });
  }
  
  per_page:any =0
  

  myPoint:any =[];
  totalCount:any =0;
  contractor_id:any;
  myPointList(){
      this.loading_list = true;
      this.loading_list = true;
      this.filter.date_created = this.filter.date_created  ? this.db.pickerFormat(this.filter.date_created) : '';
      this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';

      if( this.filter.date)this.filtering = true;
      this.filter.mode = 0;
      
      this.contractor_id = this.karigar_id;
      
      this.db.post_rqst( {'filter': this.filter, 'contractor_id':this.contractor_id}, 'app_karigar/get_contractor_request?page=' + this.current_page).subscribe( r =>
          {
              this.loading_list = false;
              this.filter.mode = 1;
              console.log(r);
              console.log(r.request_list.data);
              this.myPoint = r.request_list.data;
              this.current_page = r.request_list.current_page;
              this.last_page = r.request_list.last_page;
              this.per_page = r.request_list.per_page;
              this.totalCount = r.all_count;

          });
          
      }
  
  coupandetail:any = [];
  couponDetail()
  {
      this.loading_list = true;
      this.db.post_rqst({ 'karigar_id':this.karigar_id }, 'karigar/coupanDetail')
      .subscribe(d => {
          this.loading_list = false;
          console.log(d);
          this.coupandetail = d.coupan;
          console.log( this.coupandetail );
      });
  }
  redirect_previous1() {
      this.current_page--;
      this.getReedamList();
  }
  redirect_next1() {
      if (this.current_page < this.last_page) { this.current_page++; }
      else { this.current_page = 1; }
      this.getReedamList();
  }
  redirect_previous2() {
      this.current_page--;
      this.myPointList();
  }
  redirect_next2() {
      if (this.current_page < this.last_page) { this.current_page++; }
      else { this.current_page = 1; }
      this.myPointList();
  }
  redeem:any=[];
  reedam_all:any =0;
  getReedamList() 
  {
      this.loading_list = true;
      this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
      this.filter.start_date = this.filter.start_date  ? this.db.pickerFormat(this.filter.start_date) : '';
      this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
      if( this.filter.date ||  this.filter.start_date ||  this.filter.end_date)this.filtering = true;
      
      this.filter.karigar_id = this.karigar_id;
      this.db.post_rqst(  {  'filter': this.filter }, 'offer/redeemList')
      .subscribe( d => {
          this.loading_list = false;
          console.log(d);
          this.current_page = d.redeem.current_page;
          this.last_page = d.redeem.last_page;
          this.redeem = d.redeem.data;
          
          this.reedam_all = d.redeem_all;
          
          this.coupon_scanned_count = d.coupon_scanned_count;
      });
  }      
  
  coupon_scanned_count:any = 0;
  scanned_coupon:any=[];
  getScannedList() 
  {
      this.loading_list = true;
      this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
      this.filter.used_date = this.filter.used_date  ? this.db.pickerFormat(this.filter.used_date) : '';
      this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
      if( this.filter.date  || this.filter.used_date || this.filter.end_date)this.filtering = true;
      this.filter.karigar_id = this.karigar_id;
      this.db.post_rqst(  {  'filter': this.filter }, 'offer/couponScannedListRetailer?page=' + this.current_page)
      .subscribe( d => {
          this.loading_list = false;
          console.log(d);
          this.current_page = d.scanned_coupon.current_page;
          this.last_page = d.scanned_coupon.last_page;
          this.scanned_coupon = d.scanned_coupon.data;
          this.coupon_scanned_count = d.scanned_coupon.total;
      });
  }
  


  referral_data:any=[];
  point_transfer:any=[]; 
  company_point_transfer:any=[];
  
  getReferral() 
  {
      this.loading_list = true;
      
      this.filter.karigar_id = this.karigar_id;
      this.db.post_rqst(  {  'filter': this.filter }, 'offer/getReferralData')
      .subscribe( d => {
          this.loading_list = false;
          console.log(d);
          this.referral_data = d.referal;
          this.point_transfer = d.point_transfer;
          this.company_point_transfer = d.company_point_transfer;

      });
  }

  


  assignplumber:any={};
  getAssignPlumberList()
{
    this.filter = this.filter
  this.karigar_id = this.karigar_id;
  this.db.post_rqst(  {  'dealer_id': this.karigar_id,'filter':this.filter }, 'offer/plumber_List')
  .subscribe( d => {
      this.loading_list = false;
      console.log(d);
      this.assignplumber = d.karigars;
     
  });
}








  points_summry:any=[];
  get_points_summry() 
  {
      this.loading_list = true;
      
      this.filter.karigar_id = this.karigar_id;
      this.db.post_rqst(  {  'filter': this.filter }, 'offer/points_summry')
      .subscribe( resp => {
          this.loading_list = false;
          console.log(resp);
          this.points_summry = resp.birthday;
      });
  }
  
  submit_manual_permission()
  {
      this.loading_list = true;
      this.getData.manual_vaild_upto = this.getData.manual_vaild_upto  ? this.db.pickerFormat(this.getData.manual_vaild_upto) : '';
      this.db.post_rqst({ 'manual' : this.getData  }, 'karigar/manual_permission')
      .subscribe(d => {
          console.log(d);
          this.loading_list = false;
          this.dialog.warning('Permission set Successfully!');
          
          this.getKarigarDetails();
      });
  }
  
  goBack()
  {
      if(this.db.previousUrl == '/demo-karigar-list')
      {
          this.router.navigate(['/demo-karigar-list']);
      }
      else
      {
          this.router.navigate(['/dealer-list/'+this.page_number]);
      }
  }
  
  reponeCoupon(id) {
      const dialogRef = this.alrt.open(ReopenRemarkModleComponent,{
          width: '500px',
          data: {
              'id' : id,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if( result ){
              this.getKarigarDetails();
              this.getScannedList();
          }
      });
  }
  
//   export()
//   {
      
//       this.filter.mode = 1;
//       this.db.post_rqst({'filter': this.filter }, 'offer/scannedCouponExcel')
//       .subscribe( d => {
//           this.loading_list = false;
//           this.filter.mode = 0;
//           document.location.href = this.db.myurl+'/app/uploads/exports/ScannedCoupon.csv';
//           console.log(d);
//       });
//   }




exportExcel()
{
  this.filter.mode = 1;
  this.db.post_rqst({'filter': this.filter}, 'app_master/export_contractor_list')
  .subscribe( d => {
    document.location.href = this.db.myurl+'/app/uploads/Retailer_code.csv';
    console.log(d);
  });
}


  
  step = 1;
  setStep(index: number) {
      this.step = index;
  }
  nextStep() {
      this.step++;
  }
  prevStep() {
      this.step--;
  }
  openDialog(img) {
    const dialogRef = this.alrt.open(ProductImageModuleComponent,
      {
        data: {
          'img' : img,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
  changeStatus(id)
  {
      const dialogRef = this.alrt.open(ChangeKarigarStatusComponent,{
          width: '500px',
          height:'500px',
          
          data: {
              'id' : id,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          if( result ){
              this.getReedamList();
          }
      });
  }
  
  requestchangeStatus(i,id,status)
  {
      console.log(status);
      
      const dialogRef = this.alrt.open(ChangeStatusComponent,{
          width: '500px',
          height:'500px',
          
          data: {
              'id' : id,
              'status' : status,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          if( result ){
              this.getReedamList();
          }
      });
      
  }
  
  balanceModel(id)
  {
      const dialogRef = this.alrt.open(KarigarBalanceModelComponent,{
          width: '650px',
          data: {
              'id' : id,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      });
  }
  
  coupon_summary(id) 
  {   
      const dialogRef = this.alrt.open(ReedemCouponSummaryComponent,{
          width: '800px',
          data: {
              'id':id,
          }
      });
      dialogRef.afterClosed().subscribe( r => {
          if( r ) this.getReedamList();
      });
  }
  
  openBonusPoint(): void {
      console.log(this.getData);
      
      const dialogRef = this.alrt.open(BonusPointModelComponent, {
          width: '500px',
          data:{
              karigar:this.getData
          }
      });
      dialogRef.afterClosed().subscribe( r => {
          this.getKarigarDetails();
          this.getScannedList();
          this.get_points_summry();
      });
  }

      
  modalOpen(target,data, id, type, point) {
    console.log(data);
    console.log(id);
    
    const dialogRef = this.alrt.open(ContractorSatusModalComponent,
      {
        width: '768px',
        data: {
          target,
          data,
          id, 
          type,
          point
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getKarigarDetails();
      });
    }
    

}

