import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import { ShippedDetailModelComponent } from '../shipped-detail-model/shipped-detail-model.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-change-status-redeem',
  templateUrl: './change-status-redeem.component.html',
})
export class ChangeStatusRedeemComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  mode:any;
  savingData = false;
  redeem_id;
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,public alrt:MatDialog,  @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<ChangeStatusRedeemComponent>) {
      
      this.data.id = lead_data.id; 
      this.data.karigar_id=lead_data.karigar_id;
      this.offer.gift_status=lead_data.gift_status;
      this.offer.receive_status=lead_data.receive_status;
      this.offer.desc=lead_data.reason;
      console.log( this.offer.desc);
      
      
    }
    ngOnInit() {
      
      this.route.params.subscribe(params => {
        this.redeem_id = params['redeem_id'];
        
        if (this.redeem_id) {
        }
      });
    }
   
    
    shippedDetail()
    {
      if(this.offer.receive_status == 'Shipped')
        {
          this.shippedModel();
          return;
        }
 
    }
    Remove()
    {
      if(this.offer.gift_status=='Pending' || this.offer.gift_status=='Reject')
      {
        this.offer.receive_status='';
        console.log(this.offer.receive_status);
        
      }
      if(this.offer.gift_status=='Pending' || this.offer.gift_status=='Approved')
      {
        this.offer.desc='';
      }
    }
    shippedModel(){

      const dialogRef = this.alrt.open(ShippedDetailModelComponent,
        {
          width: '500px',
          // height:'500px',
          
          data: {
            id:  this.data.id,
            karigar_id: this.data.karigar_id,
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if( result ){
            this.addoffer();
          }else{
            this.offer.receive_status=''; 
          }
        });
        
      
  }

    offer:any = {};
    addoffer()
    {
      this.savingData = true;
      this.db.post_rqst( { 'status' : this.offer ,'id': this.data.id }, 'offer/redeemGiftStatus')
      .subscribe( d => {
        this.savingData = false;
        this.dialog.success( 'Status successfully Change');
        this.dialogRef.close(true);
      });
    }

    onNoClick(): void{
    this.dialogRef.close();
    }
  }
  