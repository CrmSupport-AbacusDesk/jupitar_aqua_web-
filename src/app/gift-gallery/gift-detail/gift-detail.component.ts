import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import {CouponDetailsComponent} from '../../karigar/coupon-details/coupon-details.component';
import {ChangeStatusComponent} from '../../gift-gallery/change-status/change-status.component';
import { ProductImageModuleComponent } from '../../master//product-image-module/product-image-module.component';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
})
export class GiftDetailComponent implements OnInit {
  
  gift_id;
  loading_list = false;
  
  filter:any = {};
  filtering : any = false;
  last_page: number ;
  current_page = 1;
  search: any = '';
  
  reedam_all:any =0;
  reedam_pending:any =0;
  reedam_approved:any =0;
  reedam_reject:any =0;
  reedam_verified:any=0;
  uploadUrl:any={}
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent, public alrt:MatDialog ) {
      this.uploadUrl = db.uploadUrl;

    }
    ngOnInit() {
      this.filter.gift_status = ''
      this.route.params.subscribe(params => {
        this.gift_id = params['gift_id'];
        if (this.gift_id) {
          this.getGiftDetails();
          this.getReedamList();
        }
      });
    }
    redirect_previous() {
      this.current_page--;
      this.getReedamList();
    }
    redirect_next() {
      if (this.current_page < this.last_page) { this.current_page++; }
      else { this.current_page = 1; }
      this.getReedamList();
    }
    getData:any = {};
    getGiftDetails() {
      this.loading_list = true;
      this.db.post_rqst(  { 'gift_id':this.gift_id}, 'offer/giftDetail')
      .subscribe(d => {
        this.loading_list = false;
        console.log(d);
        this.getData = d.gift;
        if(this.getData.status=="Active")
        {
            this.getData.giftStatus=true;
        }
        else if(this.getData.status=="Deactive")
        {
            this.getData.giftStatus=false;
        }
      });
    }
    redeem:any=[];
    getReedamList() 
    {
      this.loading_list = true;
      this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
      if( this.filter.date || this.filter.location_id )this.filtering = true;
      this.filter.gift_id = this.gift_id;
      this.db.post_rqst(  {  'filter': this.filter }, 'offer/redeemList')
      .subscribe( d => {
        this.loading_list = false;
        console.log(d);
        if(this.filter.gift_status == '')
        {
          this.filter.gift_status = '';
        }
        this.current_page = d.redeem.current_page;
        this.last_page = d.redeem.last_page;
        this.redeem = d.redeem.data;
        this.reedam_all = d.redeem_all;
        this.reedam_pending = d.redeem_pending;
        this.reedam_approved = d.redeem_approved;
        this.reedam_reject = d.redeem_reject;
      });
    }
    updateGiftStatus(event)
    {
        console.log(event);
        console.log(event.checked);
        if(event.checked == false)
        {
            console.log('false');
            
            const dialogRef = this.alrt.open(DeactiveStatusComponent,
                {
                    width: '500px',
                    // height:'500px',
                    
                    data: {
                        'id' : this.getData.id,
                        'type':'gift',
                        'checked' : event.checked,
                    }
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog result: ${result}`);
                    if( result ){
                        this.getGiftDetails();
                    }
                    this.getGiftDetails();
                });
            }
            else if(event.checked == true)
            {
                this.db.post_rqst({'checked' : event.checked, 'id' : this.getData.id,'login_id':this.db.datauser.id}, 'master/giftStatus')
                .subscribe(d => {
                    console.log(d);
                    this.dialog.success( 'Gift Status Change successfully ');
                    
                    this.getGiftDetails();
                });
            }
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
          const dialogRef = this.alrt.open(ChangeStatusComponent,
            {
              width: '500px',
              // height:'500px',
            
            data: {
              'id' : id,
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          }
        }
        