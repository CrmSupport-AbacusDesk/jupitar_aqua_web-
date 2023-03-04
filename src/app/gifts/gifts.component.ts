import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog,MatDatepicker} from '@angular/material';
import {SessionStorage} from '../_services/SessionService';
import {DatabaseService} from '../_services/DatabaseService';
import {DialogComponent} from '../dialog/dialog.component';
import * as moment from 'moment';
import { ProductImageModuleComponent } from '../master/product-image-module/product-image-module.component';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
})
export class GiftsComponent implements OnInit {
  today:any = moment().format("YYYY-MM-DD");
  uploadUrl:any='';
    
  loading: any;
  data: any;
  source: any = '';
  loading_list = true;
  offer: any = [];
  locations: any = [];
  total_offer = 0;
  karigar_all:any =0;
  offer_all : any = 0;
  offer_active : any = 0;
  offer_deactive : any = 0;
  last_page: number ;
  current_page = 1;
  search: any = '';
  filter:any = {};
  filtering : any = false;
  active_pending_tab:any;
  gift: any = [];
  total_gift = 0;
  gift_offer:any= 0;
  gift_pending : any = 0;
  gift_approved : any = 0;
  gift_reject : any = 0;
  gift_total : any = 0;
  gift_point : any = 0;
  gift_all : any = 0;
  
  constructor(public db: DatabaseService, private navrouter:Router,  public dialog: DialogComponent,public alrt:MatDialog,public router:ActivatedRoute,public ses: SessionStorage) { }

  ngOnInit() {
    this.uploadUrl = this.db.uploadUrl;

    this.filter.status = '';
    this.getGiftList('');
}

openDatePicker(picker : MatDatepicker<Date>)
{
    picker.open();
}
redirect_previous() {
    this.current_page--;
    this.getGiftList('');
}
redirect_next() {
    if (this.current_page < this.last_page) { this.current_page++; }
    else { this.current_page = 1; }
    this.getGiftList('');
}

current1()
{
    this.current_page = 1;
    this.getGiftList('');
}
last1()
{
    this.current_page = this.last_page;
    this.getGiftList('');
}


getGiftList(action) 
{
    this.loading_list = true;
    this.filtering = false;
    this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
    this.filter.start_date = this.filter.start_date  ? this.db.pickerFormat(this.filter.start_date) : '';
    this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
    if( this.filter.date  || this.filter.title  || this.filter.offer_title  || this.filter.end_date  || this.filter.search )this.filtering = true;
    this.filter.mode = 0;
    
    if(action=='refresh')
    {
        this.filter={};
        this.filter.status= '';
        // this.current_page= 1;
    }
    
    this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/dropDownGift?page=' + this.current_page )
    .subscribe((d)=> {
        this.loading_list = false;
        console.log(d);
        
        // this.current_page = d.gift.current_page;
        // this.last_page = d.gift.last_page;
        this.gift = d.gift;
        
        for (let i = 0; i < this.gift.length; i++) {
            
            if(this.gift[i].status=="Active")
            {
                this.gift[i].giftStatus=true;
            }
            else if(this.gift[i].status=="Deactive")
            {
                this.gift[i].giftStatus=false;
            }
        }   
        
        this.total_gift = d.gift.total;
        
        // this.offer = d.offer;
        // this.gift_offer = d.offer;
        
        this.gift_all =  d.gift_all;
        this.gift_approved = d.gift_approved;
        this.gift_pending =  d.gift_pending;
        this.gift_reject =  d.gift_reject;
    });
}

editGift(val){
    console.log(val)
    //    return;
    this.navrouter.navigate(['/add-gift/' + val]);
}

deactiveStatus(id)
{
  this.db.post_rqst( {'id' :id ,'login_id' : this.db.datauser.id},'offer/updateGiftAdd')
  .subscribe( d => {
    this.getGiftList('refresh');
    this.dialog.success( 'Gift successfully Deleted');
    console.log( d );
  });
}

updateGiftStatus(event,id)
{
    console.log(event);
    console.log(event.checked);
    if(event.checked == false)
    {
        console.log('false');
        
        const dialogRef = this.alrt.open(DeactiveStatusComponent,{
            width: '500px',
            // height:'500px',
            
            data: {
                'id' : id,
                'type':'gift',
                'checked' : event.checked,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if( result ){
                this.getGiftList('');
            }
            this.getGiftList('');
        });
    }
    else if(event.checked == true)
    {
        this.db.post_rqst({'checked' : event.checked, 'id' : id,'login_id':this.db.datauser.id}, 'master/giftStatus')
        .subscribe(d => {
            console.log(d);
            this.dialog.success( 'Gift Status Change successfully ');
            
            this.getGiftList('');
        });
    }
}
exportGift()
{
    this.filter.mode = 1;
    this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'offer/exportGift')
    .subscribe( d => {
        this.loading_list = false;
        document.location.href = this.db.myurl+'/app/uploads/exports/gift.csv';
        console.log(d);
    });
}
orderListReverse(){
    this.gift=this.gift.reverse();
}
deleteGift(id) {
    
    this.db.post_rqst({'id': id}, 'offer/giftRemove')
    .subscribe(d => {
        console.log(d);
        this.getGiftList('');
    });
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


openDatepicker(): void {
    const dialogRef = this.alrt.open(MastetDateFilterModelComponent, {
        width: '500px',
        data: {
            from:this.filter.date_from,
            to:this.filter.date_to
        }
    });
    
    dialogRef.afterClosed().subscribe(result => {
        this.filter.date_from = result.from;
        this.filter.date_to = result.to;
        this.getGiftList('');
    });
}
}
