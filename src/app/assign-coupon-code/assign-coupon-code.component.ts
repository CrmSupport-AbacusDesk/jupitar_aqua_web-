import { Component, OnInit , Inject } from '@angular/core';
import { DialogComponent } from './../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DatabaseService } from '../_services/DatabaseService';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-assign-coupon-code',
  templateUrl: './assign-coupon-code.component.html',
  styleUrls: ['./assign-coupon-code.component.scss']
})
export class AssignCouponCodeComponent implements OnInit {

    
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router,public dialog:DialogComponent,private dialogRef: MatDialogRef<AssignCouponCodeComponent>,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) public params: any) {
      console.log(this.params);
      this.data = this.params;
      this.data.coupon_code = this.params.value;
      this.data.mode = this.params.mode;
      console.log(this.data.coupon_code);
      
      this.data.from = this.params.from;
      this.data.to = this.params.to;
      console.log(this.data);
      
  }
  mode:any;
  data:any={};
  today:any = '';
  karigar:any;
  modedisabled:any;

  ngOnInit() {
      this.getKariger('');
      this.today = new Date();
  }
  
  submit()
  {
      console.log(this.data);
      this.data.from = this.data.from  ? this.db.pickerFormat(this.data.from) : '';
      this.data.to = this.data.to  ? this.db.pickerFormat(this.data.to) : '';
      this.dialogRef.close(this.data);
  }

  getKariger(e) 
  {
      // this.loading_list = true;
      // this.filter.mode = 0;
      
      // if(action=='refresh')
      // {
      //     this.filter ={};
      // }

    //   this.filter.limit = 0;
      https://apps.abacusdesk.com/PlusPointLock/dd_api/karigar/karigarListCoupon
      this.db.post_rqst(  {"filter":{"search":e,"limit":0}}, 'karigar/karigarListCoupon')
      .subscribe( d => {
                      
          console.log("kargir",d);
          this.karigar = d['karigars']
          console.log("this.karigar",this.karigar);
          if(this.karigar == e ){
              this.modedisabled = false
          }
          
         
      });
  }
 

 
  
  assignCoupon(){
     
      console.log("code ====>",this.data.coupon_code);
      this.db.post_rqst( {"qr_code": this.data.coupon_code,"karigar_id": this.data.karigar_id,'login_id':this.db.datauser.id, }, 'app_karigar/karigarCoupon')
      .subscribe( d => {

          if(d['status']== 'USED' ){
              console.log('log');
              this.dialog.warning("This coupon already used!");
              return
              
          }else if(d['status'] == 'INVALID'){
              console.log('log');
              this.dialog.warning("This coupon is Invalid!");
              return
          }
          else if(d['status'] == 'VALID'){
              this.dialog.success('Coupon Assigned successfully');
              this.router.navigateByUrl('/coupon-code-list');
              
          }
          
          console.log("kargir",d);
          this.karigar = d['karigars']
          this.dialogRef.close();
          console.log("this.karigar",this.karigar);
          
          
      });
  }
}
