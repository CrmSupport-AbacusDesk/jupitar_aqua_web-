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
    selector: 'app-sales-executive',
    templateUrl: './sales-executive.component.html',
})
export class SalesExecutiveComponent implements OnInit {
    
    savingData = false;
    salesForm: any = {};
    loading_list = false;
    total_sales:any = 0;
    sales:any =[];
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
        public dialog: DialogComponent,public alrt:MatDialog) {}
        
        ngOnInit() {
            this.getSalesList('');
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
            this.getSalesList('');
        }
        redirect_next() {
            if (this.current_page < this.last_page) { this.current_page++; }
            else { this.current_page = 1; }
            this.getSalesList('');
        }
        
        toggle:any;
        saveSales(form:any) {
            this.savingData = true;
            if(this.sales.id){
                this.salesForm.edit_sale_id = this.sales.id;
            }
            this.salesForm.created_by = this.db.datauser.id;
            this.db.post_rqst( { 'sale' : this.salesForm }, 'master/salesAdd')
            .subscribe( d => {
                this.savingData = false;
                console.log( d );
                if(d['status'] == 'EXIST' ){
                    this.dialog.error( 'This Sales Excutive Already exists');
                    return;
                }
                this.toggle = "false"
                this.router.navigate(['sales-executive-list']);
                this.dialog.success( 'Sales Excutive successfully save');
                this.getSalesList('');
            });
        }
        getKarigarDetail(id,status,point)
        {
            console.log(point);
            
            if( point == 0 ){
                console.log('in');
                return;
            }
            console.log(id);
            console.log(status);
            
            const dialogRef = this.alrt.open(KarigarDetailModuleComponent,
                {
                    width: '1500px',
                    height:'1000px',
                    
                    data: {
                        'id' :id,
                        'status':status,
                    }
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog result: ${result}`);
                    if( result ){
                        
                    }
                });
            }
            
            editSales(id,index){
                console.log(id);
                
                console.log(index)
                let data = this.sales.filter( x => x.id==id);
                this.salesForm=data[0];
                this.sales.id= this.salesForm.id;
                console.log( this.sales.id);
                console.log(this.salesForm);
            }
            
            addSales()
            {
                this.salesForm={};
                console.log("dscds");
                
            }
            
            getData:any = {};
            getSalesList(action) {
                console.log(this.db.datauser);
                
                this.loading_list = true;
                if( this.filter.date || this.filter.location_id )this.filtering = true;
                
                if(action=='refresh')
                {
                    this.filter={}
                }
                this.db.post_rqst({ 'filter': this.filter}, 'master/salesList?page=' + this.current_page )
                .subscribe(d => {
                    console.log(d);
                    
                    this.current_page = d.sales.current_page;
                    this.last_page = d.sales.last_page;
                    this.total_sales =d.sales.total;
                    this.sales = d.sales.data;
                    console.log( this.sales );
                    for(let i=0;i<this.sales.length;i++)
                    {
                        if(this.sales[i].status=="Active")
                        {
                            this.sales[i].salesStatus=true;
                        }
                        else if(this.sales[i].status == "Deactive")
                        {
                            this.sales[i].salesStatus=false;
                        }
                    }
                    
                    this.loading_list = false;
                });
            }
            
            deleteProduct(id) {
                this.dialog.delete('Sales Excutive').then((result) => {
                    if(result) {
                        this.db.post_rqst({ id : id}, 'master/salesDelete')
                        .subscribe(d => {
                            console.log(d);
                            this.getSalesList('');
                            this.dialog.successfully();
                        });
                    }
                });
            } 
            
            status(id) {
                
                this.db.post_rqst({id : id}, 'master/salesStatus')
                .subscribe(d => {
                    console.log(d);
                    this.getSalesList('');
                });
            }
            
            numeric_Number(event: any) {
                const pattern = /[0-9\+\-\ ]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (event.keyCode != 8 && !pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
            updateStatus(i,event,id)
            {
                console.log(id);
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
                                'id' :id,
                                'type':'sales_executive',
                                'checked' : event.checked,
                            }
                        });
                        dialogRef.afterClosed().subscribe(result => {
                            console.log(`Dialog result: ${result}`);
                            if( result ){
                                this.getSalesList('');
                            }
                            this.getSalesList('');
                        });
                    }
                    else if(event.checked == true){
                        this.db.post_rqst({'checked' : event.checked, 'id' : id,'login_id':this.db.datauser.id}, 'master/salesStatus')
                        .subscribe(d => {
                            console.log(d);
                            this.dialog.success( 'Status Change successfully ');
                            this.getSalesList('');
                        });
                    }
                }
                
                exportproductCategory()
                {
                    this.filter.mode = 1;
                    this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'master/exportSalesExecutive')
                    .subscribe( d => {
                        this.loading_list = false;
                        document.location.href = this.db.myurl+'app/uploads/exports/salesExecutiveList.csv';
                        console.log(d);
                    });
                }
            }
            