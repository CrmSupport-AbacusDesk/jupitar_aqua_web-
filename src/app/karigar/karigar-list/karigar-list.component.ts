import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {DialogComponent} from '../../dialog/dialog.component';
import { MatDialog, MatDatepicker } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';
import { SendmessageComponent } from 'src/app/master/karigar-data/sendmessage/sendmessage.component';
import { SendNotificationComponent } from 'src/app/master/karigar-data/send-notification/send-notification.component';
import { ChangeTypeModalComponent } from 'src/app/change-type-modal/change-type-modal.component';


@Component({
    selector: 'app-karigar-list',
    templateUrl: './karigar-list.component.html',
})
export class KarigarListComponent implements OnInit {
    
    loading_list = true;
    karigars: any = [];
    total_karigars = 0;
    karigar_all:any =0;
    
    last_page: number ;
    current_page = 1;
    search: any = '';
    filter:any = {};
    filtering : any = false;
    select_all:any=false;
    
    karigar_pending : any = 0;
    karigar_reject : any = 0;
    karigar_suspect : any = 0;
    karigar_verified : any = 0;
    
    constructor(public db: DatabaseService, public dialog: DialogComponent,public route:ActivatedRoute,public alrt:MatDialog) {
        this.route.params.subscribe(resp=>{
            this.current_page = resp.page;
        });
        this.filter = this.db.get_filters();
        console.log(this.filter);
        if(this.filter.status == undefined)
        {
            this.filter.status = 'All';
        }
    }
    
    
    ngOnInit() {
        this.get_karigar_type();
        this.getKarigarList(''); 
        this.AssignSaleUser();
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    redirect_previous() {
        this.current_page--;
        this.getKarigarList('');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getKarigarList('');
    }
    
    set_filter(data)
    {
        this.db.set_filters(data);
    }
    current1()
    {
        this.current_page = 1;
        this.getKarigarList('');
    }
    last1()
    {
        this.current_page = this.last_page;
        this.getKarigarList('');
    }
    

    wallet_asc = false;

    sortByWallet(){
        this.wallet_asc = !this.wallet_asc;
        if(this.wallet_asc){
            this.filter.sortBy = {
                "sorting_order": "asc"
            }
            this.getKarigarList('');
        }
        else if (!this.wallet_asc){
            this.filter.sortBy = {
                "sorting_order": "desc"
            }
            this.getKarigarList('');
        }
    }

    total_wallet_point:any = 0;
    
    getKarigarList(action:any) 
    {
        console.log(this.filter);
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        if( this.filter.date)this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.select_all = false;
            let status = this.filter.status
            this.filter={}
            this.assign_arr=[];
            this.filter.status= status;
            this.current_page = 1;
        }
        
        
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser,user_type:"1"}, 'karigar/karigarList?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);            
            this.current_page = d.karigars.current_page;
            this.last_page = d.karigars.last_page;
            this.total_karigars =d.karigars.total;
            this.karigars = d.karigars.data;            
            this.karigar_all = d.karigar_all;
            this.karigar_pending = d.karigar_pending;
            this.karigar_reject = d.karigar_reject;
            this.karigar_suspect = d.karigar_suspect;
            this.karigar_verified = d.karigar_verified;            
            for(var i=0; i<this.karigars.length; i++)
            {
                if(this.select_all)
                {
                    this.karigars[i]['checked'] = true;
                }
                this.karigars[i]['total_wallet_point'] = parseInt(this.karigars[i]['balance_point']) + parseInt(this.karigars[i]['referal_point_balance']);
            }
        });
    }
    
    exportKarigar()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser,user_type:'1'}, 'karigar/exportKarigar')
        .subscribe( d => {
            document.location.href = this.db.myurl+'/app/uploads/exports/Plumber.csv';
            console.log(d);
        });
    }
    
    change_kar_type(data)
    {
        this.db.post_rqst({ 'kar_type' : data.karigar_type, 'id' : data.id }, 'karigar/changeKarType')
        .subscribe(d => {
            console.log(d);
            this.dialog.success("Updated Successfully!");
            this.getKarigarList('');
        });
    }
    
    type_list = [];
    get_karigar_type()
    {
        this.db.post_rqst({},"karigar/get_kar_type")
        .subscribe(resp=>{
            console.log(resp);
            this.type_list = resp.types;
        })
    }
    
    sales_users:any=[];
    AssignSaleUser()
    {
        this.db.get_rqst('','karigar/sales_users')
        .subscribe(d => {
            console.log(d);
            this.sales_users = d.sales_users;
        });
    }
    getDealer:any=[];
    dealer()
    {
        this.loading_list = true;
        this.db.get_rqst(  '', 'karigar/dealer_contact_person')
        .subscribe(d => {
            this.loading_list = false;
            console.log(d);
            this.getDealer = d.dealer_contact_person;
        });
    }
    
    deleteKarigar(id)
    {
        this.dialog.delete('Karigar')
        .then((result) => {
            if(result)
            {
                this.db.post_rqst({'id': id}, 'karigar/remove')
                .subscribe(d => {
                    console.log(d);
                    this.getKarigarList('');
                    this.dialog.successfully();
                });
            }
        });
    }
    
    karigarsSatus(i)
    {
        this.db.post_rqst({ 'status' : this.karigars[i].status, 'id' : this.karigars[i].id }, 'karigar/karigarStatus')
        .subscribe(d => {
            console.log(d);
            this.getKarigarList('');
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
            this.getKarigarList('');
        });
    }
    
    assign_arr:any=[]
    unassign_arr:any=[]
    select_item(event,indx)
    {        
        console.log(event);
        if(event.checked)
        {
            this.assign_arr.push(this.karigars[indx]);
            let idx = this.unassign_arr.findIndex(row => row.id == this.karigars[indx].id);
            this.unassign_arr.splice(idx,1);
        }
        else
        {
            let idx = this.assign_arr.findIndex(row => row.id == this.karigars[indx].id);
            this.assign_arr.splice(idx,1);
            this.unassign_arr.push(this.karigars[indx]);
        }
        console.log(this.assign_arr);
        console.log(this.unassign_arr);
    }
    
    select_all_data()
    {
        this.assign_arr = [];
        this.unassign_arr = [];
        console.log(this.select_all);
        this.karigars.forEach(element => {
            element.checked = this.select_all
        });
        console.log(this.assign_arr);
    }
    
    opensendmessage(user):void{
        const dialogRef = this.alrt.open(SendmessageComponent, {
            width: '500px',
            data:{
                user_type:user,
                assign_arr:this.assign_arr,
                unassign_arr:this.unassign_arr,
                filter:this.filter,
                select_all:this.select_all,
            }
        });
    }

    changeType(target, id, user_type):void{
        const dialogRef = this.alrt.open(ChangeTypeModalComponent, {
            width: '500px',
            data:{
               'number':target,
               'id':id,
               'user_type':user_type
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getKarigarList('');
        });
    }

    opensendnitification(user):void{
        const dialogRef = this.alrt.open(SendNotificationComponent, {
            width: '500px',
            data:{
                user_type:user,
                assign_arr:this.assign_arr,
                unassign_arr:this.unassign_arr,
                filter:this.filter,
                select_all:this.select_all,
            }
        });
    }
    convertType():void{
        console.log("convert function call");
        this.db.post_rqst({'data':this.assign_arr},'karigar/convertKarigarToDealer').subscribe(res=>{
            console.log(res);
            this.getKarigarList('');
        })
    }
}

