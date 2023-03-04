import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { CouponCodeModalComponent } from '../coupon-code-modal/coupon-code-modal.component';

@Component({
  selector: 'app-add-coupon-codes',
  templateUrl: './add-coupon-codes.component.html'
})
export class AddCouponCodesComponent implements OnInit {
  loading_list = false;
  coupon: any = {};
  available_coupon: any = {};
  savingData = false;
  filter:any = {};
  date1;
  product_code:any =[];
  


  constructor(public db: DatabaseService,  public dialog: DialogComponent, public alrt: MatDialog) { 
    
  }

  ngOnInit() {
    this.getProduct();
    this.getAvailableCoupanList('');
  }

  getProduct(){
    this.db.post_rqst( '', 'app_karigar/getProduct?page=').subscribe(r=>{
      console.log(r);
      this.product_code=r['productData'];
      this.getSize('');
    })
  }

  product_size:any =[];
  getSize(id){
    console.log(id);
    this.db.post_rqst( {'product_id':id}, 'app_karigar/coupon_product_size?page=').subscribe(r=>{
      console.log(r);
      this.product_size=r['product_sizes'];
    })
  }

  getAvailableCoupanList(f){
     this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
    console.log("coupon list is come");
    this.db.post_rqst({'filter': this.filter},'app_master/coupon_history').subscribe(r=>{
      // console.log(r);
      this.available_coupon=r['coupon']['data'];
      console.log(this.available_coupon);
    })
  }

  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

saveCouponfrom(form: any) {
    console.log(this.coupon);
    console.log('====================================');
    console.log("test");
    console.log('====================================');

    if (this.coupon.total_coupon <= 25000) {
      this.loading_list = true;
      this.savingData = true;
      this.coupon.created_by = this.db.datauser.id;
      console.log(this.coupon);
      this.db.post_rqst({ 'coupon': this.coupon }, 'app_master/generate_coupon')
        .subscribe(d => {
          if (d['status'] == 'Fields Reqired') {
            this.dialog.error('Fields Reqired!');
            return;
          }
          console.log(this.coupon);
          form.resetForm();
          this.dialog.success('Coupon has been successfully Generated');
          this.savingData = false;
          this.loading_list = false;
          this.getAvailableCoupanList('');
          // this.router.navigate(['/coupon-code-list']);
        });
    }
    else {
      this.dialog.error('Can not Generate more than 25000 coupon codes at once!');
    }

  }

  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
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
      this.getAvailableCoupanList('');
  });
}
downloadCoupon(id){
  this.db.post_rqst({'id':id}, 'app_master/exportCoupon')
  .subscribe( d => {
      document.location.href = this.db.myurl+'/app/uploads/exports/coupons.csv';
      console.log("downloaded Excel sucessfully");
  });
}

deleteCoupon(id) {
  this.dialog.delete('Coupon').then((result) => {
  if(result) {
      this.db.post_rqst({'id': id}, 'app_master/delete_multi_coupon').subscribe(d => {
      console.log(d);
      this.getAvailableCoupanList('');
      this.dialog.successfully();
      });
      }
  });
} 



openModel(val) {
  console.log('====================================');
  console.log(val);
  console.log('====================================');
  const dialogRef = this.alrt.open(CouponCodeModalComponent,{
      width: '500px',
      data: {
          'data' : val,
      }
  });
  dialogRef.afterClosed().subscribe( r => {
      if( r ) this.getAvailableCoupanList('');
  });
}

}
