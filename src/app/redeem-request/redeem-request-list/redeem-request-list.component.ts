import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {DialogComponent} from '../../dialog/dialog.component';
import {ChangeStatusComponent} from '../../gift-gallery/change-status/change-status.component';
import {MatDialog, MatDatepicker} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorage} from '../../_services/SessionService';
import { ShippedDetailModelComponent } from '../shipped-detail-model/shipped-detail-model.component';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';

@Component({
    selector: 'app-redeem-request-list',
    templateUrl: './redeem-request-list.component.html',
})
export class RedeemRequestListComponent implements OnInit {
    
    loading_list = false;
    reedam: any = [];
    locations: any = [];
    total_reedam = 0;
    
    reedam_all:any =0;
    reedam_pending:any =0;
    reedam_approved:any =0;
    reedam_reject:any =0;
    reedam_verified:any=0;
    
    last_page: number ;
    current_page = 1;
    search: any = '';
    filter:any = {};
    filtering : any = false;
    active_pending_tab:any;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent, public alrt:MatDialog ) {}
    
    ngOnInit() {
        this.route.params
        .subscribe((resp)=>
        {
            console.log(resp);
            this.active_pending_tab = resp.pending;
        })
        
        if(this.active_pending_tab == 'pending')
        {
            this.filter.gift_status = 'Pending';
        }
        else
        {
            this.filter.gift_status = '';
        }
        
        this.getReedamList('');
        
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    redirect_previous() {
        this.current_page--;
        this.getReedamList('');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getReedamList('');
    }
    
    current1()
    {
        this.current_page = 1;
        this.getReedamList('');
    }
    last1()
    {
        this.current_page = this.last_page;
        this.getReedamList('');
    }
    getReedamList(action:any) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        this.filter.start_date = this.filter.start_date  ? this.db.pickerFormat(this.filter.start_date) : '';
        this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
        if( this.filter.date )this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        { 
            let status = this.filter.gift_status;
            this.filter={};
            this.filter.gift_status= status;
            // this.current_page= 1;
        }
        
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/redeemList?page=' + this.current_page )
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            
            this.current_page = d.redeem.current_page;
            this.last_page = d.redeem.last_page;
            this.total_reedam =d.redeem.total;
            this.reedam = d.redeem.data;
            
            this.reedam_all = d.redeem_all;
            this.reedam_pending = d.redeem_pending;
            this.reedam_approved = d.redeem_approved;
            this.reedam_reject = d.redeem_reject;
        });
    }
    
    exportRedeemList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'offer/exportRedeemList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'/app/uploads/exports/redeemlist.csv';
            console.log(d);
        });
    }

    
    //   });
    // } 
    
    changeStatus(i,id,status)
    {
        console.log(status);
        
        const dialogRef = this.alrt.open(ChangeStatusComponent,{
            width: '500px',
            // height:'500px',
            
            data: {
                'id' : id,
                'status' : status,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if( result ){
                this.getReedamList('');
            }
        });
    }
    
    
    shippedModel(i, type){
        console.log('====================================');
        console.log(type);
        console.log('====================================');
        const dialogRef = this.alrt.open(ShippedDetailModelComponent,{
            width: '500px',
            
            data: {
                id:  this.reedam[i].id ,
                'payment_type': type,
                karigar_id:this.reedam[i].karigar_id,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if( result ){
                this.giftStatus(i);
            }else{
                this.getReedamList('');
            }
        });
        
        
    }
    
    karigarsSatus(i, type) {
        console.log(type);
        
        
        if(this.reedam[i].receive_status == 'Transfer' || this.reedam[i].receive_status == 'Shipped')
        {
            this.shippedModel(i, type);
            return;
        }
        
        this.giftStatus(i);
        
    }
    
    
    
    giftStatus(i){
        console.log('ship');
        
        this.db.post_rqst({ 'receive_status' : this.reedam[i].receive_status, 'id' : this.reedam[i].id }, 'offer/redeemReceiveStatus')
        .subscribe(d => {
            this.dialog.success('Success!');
            this.getReedamList('');
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
            this.getReedamList('');
        });
    }
    

    @Input() count: string;
    
}
