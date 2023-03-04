import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-referral-master',
  templateUrl: './referral-master.component.html',
})
export class ReferralMasterComponent implements OnInit {
  
  constructor(public db:DatabaseService,public toastr:DialogComponent) { }
  
  ngOnInit() {
    this.get_refer_detail();
  }
  
  refer:any={};
  get_refer_detail()
  {
    this.loading_list = true;
    this.db.post_rqst({},"master/get_refer_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.loading_list = false;
      this.refer.wlcom_points = resp['refer_othr_detail'].first_reg_point;
      this.refer.referal_point = resp['refer_othr_detail'].referral_points;
      this.refer.owner_referal_point = resp['refer_othr_detail'].owner_ref_point;
      this.refer.birthday_points = resp['refer_othr_detail'].birthday_points;
      this.refer.anniversary_points = resp['refer_othr_detail'].anniversary_points;
      this.refer.cash_redemption_limit = resp['refer_othr_detail'].cash_redemption_limit;


      this.refer.min_gif_per = resp['refer_per_detail'].one_time_percentage;
    })
  }
  
  number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  loading_list:any;
  update_details()
  {
    this.loading_list = true;
    this.db.post_rqst({"data":this.refer},"master/update_referal_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.loading_list = false;
      this.toastr.success("Updated!");
    })
  }
}
