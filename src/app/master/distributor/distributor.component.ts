import {Component,OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { MatDialog } from '@angular/material';
import { KarigarDetailModuleComponent } from '../karigar-detail-module/karigar-detail-module.component';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';

@Component({
    selector: 'app-distributor',
    templateUrl: './distributor.component.html',
})
export class DistributorComponent implements OnInit {
    
    savingData = false;
    data: any = {};
    loading_list = false;
    total_sales:any = 0;
    dis_list:any =[];
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
        public dialog: DialogComponent,public alrt:MatDialog) {}
        
        ngOnInit() {
            this.getDistributorList('');
        }
        
        last_page: number ;
        current_page = 1;
        search: any = '';
        source: any = '';
        searchData = true;
        isInvoiceDataExist = false;
        filter:any = {};
        filtering : any = false;
        
        redirect_previous() {
            this.current_page--;
            this.getDistributorList('');
        }
        redirect_next() {
            if (this.current_page < this.last_page) { this.current_page++; }
            else { this.current_page = 1; }
            this.getDistributorList('');
        }
        
        toggle:any;
        submit_data(form:any)
        {
            console.log(this.data);
            
            this.savingData = true;
            
            if(this.dis_list.id){
                this.data.edit_sale_id = this.dis_list.id;
            }
            
            this.data.created_by = this.db.datauser.id;
            
            this.db.post_rqst({'data':this.data},'master/add_distributor')
            .subscribe( d => {
                this.savingData = false;
                console.log( d );
                if(d['status'] == 'EXIST' ){
                    this.dialog.error( 'This Distributor Already exists');
                    return;
                }
                this.toggle = "false"
                this.router.navigate(['distributor-list']);
                this.dialog.success( 'Distributor successfully Added');
                this.getDistributorList('');
            });
        }
        
        
        // getKarigarDetail(id,status,point)
        // {
        //   console.log(point);
        
        //   if( point == 0 ){
        //     console.log('in');
        //     return;
        //   }
        //   console.log(id);
        //   console.log(status);
        
        //   const dialogRef = this.alrt.open(KarigarDetailModuleComponent,
        //     {
        //       width: '1500px',
        //       height:'1000px',
        
        //       data: {
        //         'id' :id,
        //         'status':status,
        //       }
        //     });
        //     dialogRef.afterClosed().subscribe(result => {
        //       console.log(`Dialog result: ${result}`);
        //       if( result ){
        
        //       }
        //     });
        //   }
        
        editDistributor(id,index){
            console.log(id);
            
            console.log(index)
            let data = this.dis_list.filter( x => x.id==id);
            this.data=data[0];
            this.dis_list.id= this.data.id;
            console.log( this.dis_list.id);
            console.log(this.data);
        }
        
        addSales()
        {
            this.data={};
        }
        
        getData:any = {};
        getDistributorList(action) {
            console.log(this.db.datauser);
            
            this.loading_list = true;
            if( this.filter.date || this.filter.location_id )this.filtering = true;
            
            if(action=='refresh')
            {
                this.filter={}
            }
            this.db.post_rqst({ 'filter': this.filter}, 'master/distributorList?page=' + this.current_page )
            .subscribe(d => {
                console.log(d);
                
                this.current_page = d.sales.current_page;
                this.last_page = d.sales.last_page;
                this.total_sales =d.sales.total;
                this.dis_list = d.sales.data;
                // for(let i=0;i<this.dis_list.length;i++)
                // {
                //     if(this.dis_list[i].status=="Active")
                //     {
                //         this.dis_list[i].dis_listStatus=true;
                //     }
                //     else if(this.dis_list[i].status == "Deactive")
                //     {
                //         this.dis_list[i].dis_listStatus=false;
                //     }
                // }
                
                this.loading_list = false;
            });
        }
        
        deleteDis(id) {
            this.dialog.delete('Distributor').then((result) => {
                if(result) {
                    this.db.post_rqst({ id : id}, 'master/distributorDelete')
                    .subscribe(d => {
                        console.log(d);
                        this.getDistributorList('');
                        this.dialog.successfully();
                    });
                }
            });
        } 
        
        // status(id) {
        
        //   this.db.post_rqst({id : id}, 'master/salesStatus')
        //   .subscribe(d => {
        //     console.log(d);
        //     this.getDistributorList('');
        //   });
        // }
        
        numeric_Number(event: any) {
            const pattern = /[0-9\+\-\ ]/;
            let inputChar = String.fromCharCode(event.charCode);
            if (event.keyCode != 8 && !pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
        
        // updateStatus(i,event,id)
        // {
        //   console.log(id);
        //   console.log(event);
        //   console.log(event.checked);
        //   if(event.checked == false)
        //   {
        //     console.log('false');
        
        //     const dialogRef = this.alrt.open(DeactiveStatusComponent,
        //       {
        //         width: '500px',
        //         height:'500px',
        
        //         data: {
        //           'id' :id,
        //           'type':'sales_executive',
        //           'checked' : event.checked,
        //         }
        //       });
        //       dialogRef.afterClosed().subscribe(result => {
        //         console.log(`Dialog result: ${result}`);
        //         if( result ){
        //           this.getDistributorList('');
        //         }
        //         this.getDistributorList('');
        //       });
        //     }
        //     else if(event.checked == true){
        //       this.db.post_rqst({'checked' : event.checked, 'id' : id,'login_id':this.db.datauser.id}, 'master/salesStatus')
        //       .subscribe(d => {
        //         console.log(d);
        //         this.dialog.success( 'Status Change successfully ');
        //         this.getDistributorList('');
        //       });
        //     }
        //   }
        
        exportproductCategory()
        {
            this.filter.mode = 1;
            this.db.post_rqst(  {'filter': this.filter ,'login':this.db.datauser}, 'master/exportDis')
            .subscribe( d => {
                this.loading_list = false;
                document.location.href = this.db.myurl+'app/uploads/exports/salesExecutiveList.csv';
                console.log(d);
            });
        }
    }
    