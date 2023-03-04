import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDatepicker} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-shipped-detail-model',
  templateUrl: './shipped-detail-model.component.html',
})
export class ShippedDetailModelComponent implements OnInit {
  
  loading_list:any = false;
  mode:any;
  savingData = false;
  redeem_id;
  offer:any = {};
  date1:any;


  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ShippedDetailModelComponent>) {

      this.date1 = new Date();
      console.log(data);
      
      this.offer.karigar_gift_id= data.id; 
      this.offer.karigar_id=data.karigar_id;
      this.offer.payment_type=this.data.payment_type;
      console.log(this.offer.karigar_id);
      
    }
    ngOnInit() {
      this.AssignSaleUser();
    }
    openDatePicker(picker : MatDatepicker<Date>)
  {
    picker.open();
  }
   
    submit(form:any)
    {
     
      this.offer.created_by=this.db.datauser.id;
      this.offer.estimated_date = this.offer.estimated_date  ? this.db.pickerFormat(this.offer.estimated_date) : '';
      this.db.post_rqst( { 'shipped' : this.offer }, 'offer/shippedInfo')
      .subscribe( d => {
        this.savingData = false;
        this.dialog.success( 'Status successfully Change');
        this.dialogRef.close(true);
        console.log( d );
      });
    }

    onNoClick(): void{
    this.dialogRef.close();
    }

    sales_users:any = [];
    AssignSaleUser()
    {
      this.loading_list = false;
      this.db.get_rqst(  '', 'karigar/sales_users')
      .subscribe(d => {
        this.loading_list = true;
        this.sales_users = d.sales_users;
      });
    }
  }
  