import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {DialogComponent} from '../../dialog/dialog.component';
import { MatDialog, MatDatepicker } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MastetDateFilterModelComponent } from 'src/app/mastet-date-filter-model/mastet-date-filter-model.component';
import { SendmessageComponent } from 'src/app/master/karigar-data/sendmessage/sendmessage.component';
import { SendNotificationComponent } from 'src/app/master/karigar-data/send-notification/send-notification.component';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.scss']
})
export class DistributorListComponent implements OnInit {

  
  loading_list = true;
  distributors: any = [];
  total_distributors = 0;
  distributor_all:any =0;
  
  last_page: number ;
  current_page = 1;
  search: any = '';
  filter:any = {};
  filtering : any = false;
  select_all:any=false;
  
  distributor_deactive : any = 0;
  distributor_reject : any = 0;
  distributor_suspect : any = 0;
  distributor_active : any = 0;
  
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
      this.get_distributor_type();
      this.getDistributorList(''); 
      this.AssignSaleUser();
  }
  
  openDatePicker(picker : MatDatepicker<Date>)
  {
      picker.open();
  }
  redirect_previous() {
      this.current_page--;
      this.getDistributorList('');
  }
  redirect_next() {
      if (this.current_page < this.last_page) { this.current_page++; }
      else { this.current_page = 1; }
      this.getDistributorList('');
  }
  
  set_filter(data)
  {
      this.db.set_filters(data);
  }
  current1()
  {
      this.current_page = 1;
      this.getDistributorList('');
  }
  last1()
  {
      this.current_page = this.last_page;
      this.getDistributorList('');
  }
  

  productForm: any = {};
  addImageIcon=true;
  products:any = [];

  isEditCalled = false;
    editProduct(id,index){
        this.isEditCalled = true;
        this.addImageIcon=true;
        this.productForm = this.products.filter( x => x.id==id)[0];
        this.productForm.profile_selected = parseInt(this.productForm.profile);
        console.log(this.productForm);
        this.productForm.profile_selected = 0;
        
    }

  total_wallet_point:any = 0;
  getDistributorList(action:any) 
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
        
        
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser,user_type:"3"}, 'karigar/karigarList?page=' + this.current_page)
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);            
            this.current_page = d.karigars.current_page;
            this.last_page = d.karigars.last_page;
            this.total_distributors =d.karigars.total;
            this.distributors = d.karigars.data;            
            this.distributor_all = d.karigar_all;
            this.distributor_reject = d.karigar_reject;
            this.distributor_suspect = d.karigar_suspect;
            this.distributor_active = d.karigar_active;  
            this.distributor_deactive = d.karigar_deactive;

            for(var i=0; i<this.distributors.length; i++)
            {
                if(this.select_all)
                {
                    this.distributors[i]['checked'] = true;
                }
                this.distributors[i]['total_wallet_point'] = parseInt(this.distributors[i]['balance_point']) + parseInt(this.distributors[i]['referal_point_balance']);
            }
        });
    }
    
    exportDistributor()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser,user_type:'3'}, 'karigar/exportKarigar')
        .subscribe( d => {
            document.location.href = this.db.myurl+'/app/uploads/exports/Distributors.csv';
            console.log(d);
        });
    }
    
    change_distributor_type(data)
    {
        this.db.post_rqst({ 'kar_type' : data.karigar_type, 'id' : data.id }, 'karigar/changeKarType')
        .subscribe(d => {
            console.log(d);
            this.dialog.success("Updated Successfully!");
            this.getDistributorList('');
        });
    }
    
    type_list = [];
    get_distributor_type()
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
    // getDealer:any=[];
    // dealer()
    // {
    //     this.loading_list = true;
    //     this.db.get_rqst(  '', 'karigar/dealer_contact_person')
    //     .subscribe(d => {
    //         this.loading_list = false;
    //         console.log(d);
    //         this.getDealer = d.dealer_contact_person;
    //     });
    // }
    
    deleteDistributor(id)
    {
        this.dialog.delete('Karigar')
        .then((result) => {
            if(result)
            {
                this.db.post_rqst({'id': id}, 'karigar/remove')
                .subscribe(d => {
                    console.log(d);
                    this.getDistributorList('');
                    this.dialog.successfully();
                });
            }
        });
    }
    
    distributorStatus(i)
    {
        this.db.post_rqst({ 'status' : this.distributors[i].status, 'id' : this.distributors[i].id }, 'karigar/karigarStatus')
        .subscribe(d => {
            console.log(d);
            this.getDistributorList('');
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
            this.getDistributorList('');
        });
    }
    
    assign_arr:any=[]
    unassign_arr:any=[]
    select_item(event,indx)
    {        
        console.log(event);
        if(event.checked)
        {
            this.assign_arr.push(this.distributors[indx]);
            let idx = this.unassign_arr.findIndex(row => row.id == this.distributors[indx].id);
            this.unassign_arr.splice(idx,1);
        }
        else
        {
            let idx = this.assign_arr.findIndex(row => row.id == this.distributors[indx].id);
            this.assign_arr.splice(idx,1);
            this.unassign_arr.push(this.distributors[indx]);
        }
        console.log(this.assign_arr);
        console.log(this.unassign_arr);
    }
    
    select_all_data()
    {
        this.assign_arr = [];
        this.unassign_arr = [];
        console.log(this.select_all);
        this.distributors.forEach(element => {
            element.checked = this.select_all
        });
        console.log(this.assign_arr);
    }
    
    opensendmessage():void{
        const dialogRef = this.alrt.open(SendmessageComponent, {
            width: '500px',
            data:{
                assign_arr:this.assign_arr,
                unassign_arr:this.unassign_arr,
                filter:this.filter,
                select_all:this.select_all,
            }
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
        this.db.post_rqst({'data':this.assign_arr},'karigar/convertStatusDistributor').subscribe(res=>{
            console.log(res);
            this.getDistributorList('');
        })
    }

}
