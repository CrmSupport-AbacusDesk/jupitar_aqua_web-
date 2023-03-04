import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProductImageModuleComponent } from 'src/app/master/product-image-module/product-image-module.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { ContractorSatusModalComponent } from '../contractor-satus-modal/contractor-satus-modal.component';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss']
})
export class ContractorListComponent implements OnInit {
  
  loading_list = true;
  karigars: any = [];
  total_karigars = 0;
  data:any =[];
  data1:any =[];

  
  last_page: number ;
  current_page = 1;
  search: any = '';
  filter:any = {};
  filtering : any = false;
  select_all:any=false;
  
  all_count:any =0;
  pending_count : any = 0;
  approved_count : any = 0;
  reject_count : any = 0;
  uploadUrl:any ='';
  
  
  constructor(public db: DatabaseService, public route:ActivatedRoute, public alrt:MatDialog, public dialog: MatDialog) { 
    this.uploadUrl = this.db.uploadUrl;
   
   
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
    this.contractorList('');
  }
  
  
  
  openDatePicker(picker : MatDatepicker<Date>)
  {
    picker.open();
  }
  redirect_previous() {
    this.current_page--;
    this.contractorList('');
  }
  redirect_next() {
    if (this.current_page < this.last_page) { this.current_page++; }
    else { this.current_page = 1; }
    this.contractorList('');
  }
  
  set_filter(data)
  {
    this.db.set_filters(data);
  }
  current1()
  {
    this.current_page = 1;
    this.contractorList('');
  }
  last1()
  {
    this.current_page = this.last_page;
    this.contractorList('');
  }
  

  image:any=[];
  data3:any=[];

  contractorList(action:any){
    this.loading_list = true;
    this.loading_list = true;
    this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
    if( this.filter.date)this.filtering = true;
    this.filter.mode = 0;
    
    if(action=='refresh')
    {
      this.select_all = false;
      let status = this.filter.status
      this.filter={}
      this.filter.status= status;
      this.current_page = 1;
    }
    
    // this.db.post_rqst( {'filter': this.filter}, 'app_karigar/get_contractor_request?page=' + 1).subscribe( r =>
      this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'app_karigar/get_contractor_request?page=' + this.current_page ).subscribe( r =>
      {
        this.loading_list = false;
        this.filter.mode = 1;
        console.log(r);
        console.log(r.request_list.data);
        this.data = r.request_list.data;
        console.log(this.data);
       
        this.current_page = r.request_list.current_page;
        this.last_page = r.request_list.last_page;
        
        
        this.all_count = r.all_count;
        this.pending_count = r.pending_count;
        this.approved_count = r.approved_count;
        this.reject_count = r.reject_count;
        // console.log(this.meetData);
      });
      
    }
    
    
    modalOpen(target,data, id, type, point, contractor_id) {
      console.log(target);
      console.log(type);
      console.log(data);
      console.log(id);
      
      const dialogRef = this.dialog.open(ContractorSatusModalComponent,
        {
          width: '768px',
          data: {
            target,
            data,
            id, 
            type,
            point,
            contractor_id
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.contractorList('');
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
        
        
      // openDialog(id, string) {
      //   const dialogRef = this.alrt.open(ProductImageModuleComponent, {
      //     data: {
      //       id: id,
      //       mode: string,
      //     },
      //   });
      //   dialogRef.afterClosed().subscribe((result) => {
      //     console.log(`Dialog result: ${result}`);
      //   });
      // }

        exportExcel()
        {
          this.filter.mode = 1;
          this.db.post_rqst({'filter': this.filter}, 'app_master/export_contractor_list')
          .subscribe( d => {
            document.location.href = this.db.myurl+'/app/uploads/Retailer_code.csv';
            console.log(d);
          });
        }
      }
      