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
    selector: 'app-demo-karigar',
    templateUrl: './demo-karigar.component.html',
})
export class DemoKarigarComponent implements OnInit {
    
    savingData = false;
    karigarform: any = {};
    loading_list = false;
    total_karigars:any = 0;
    karigars:any =[];
    karigar_id:any='';
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent,public alrt:MatDialog) {
        
    }
    
    ngOnInit() {
        this.getDemoKar('');
        this.getStateList();
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
        this.getDemoKar('');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getDemoKar('');
    }
    
    toggle:any;
    saveDemoKar(form:any) 
    {
        this.savingData = true;
        this.loading_list = true;
        
        this.karigarform.dob = this.karigarform.dob  ? this.db.pickerFormat(this.karigarform.dob) : '';
        this.karigarform.created_by = this.db.datauser.id;
        this.karigarform.karigar_type = 2;
        this.karigarform.gender = 'male';
        this.karigarform.karigar_edit_id = this.karigar_id;
        this.db.insert_rqst( { 'karigar' : this.karigarform }, 'karigar/addKarigar')
        .subscribe( d => {
            this.savingData = false;
            this.loading_list = false;
            console.log( d );
            if(d['status'] == 'EXIST' ){
                this.dialog.error( 'This Demo karigar Already exists');
                return;
            }
            this.toggle = "false"
            this.router.navigate(['demo-karigar-list']);
            this.dialog.success( 'Sales Demo Kariger successfully save');
            this.getDemoKar('');
        });
    }
    
    editKarigar(row)
    {
        this.karigarform = row;
        this.karigar_id = this.karigarform.id;
        this.getDistrictList();
    }
    
    addkarigars()
    {
        this.karigarform={};
    }
    
    intVal(data)
    {
        return parseInt(data);
    }


    getData:any = {};
    getDemoKar(action) 
    {
        console.log(this.db.datauser);
        this.loading_list = true;
        if( this.filter.date || this.filter.location_id )this.filtering = true;
        if(action=='refresh')
        {
            this.filter={}
        }
        this.db.post_rqst({ 'filter': this.filter}, 'karigar/demoKarigarList?page=' + this.current_page )
        
        .subscribe((d) => {
            console.log(d);
            
            this.current_page = d.karigars.current_page;
            this.last_page = d.karigars.last_page;
            this.total_karigars =d.karigars.total;
            this.karigars = d.karigars.data;
            console.log( this.karigars );
            for(let i=0;i<this.karigars.length;i++)
            {
                if(this.karigars[i].status=="Active")
                {
                    this.karigars[i].karigarsStatus=true;
                }
                else if(this.karigars[i].status == "Deactive")
                {
                    this.karigars[i].karigarsStatus=false;
                }
            }
            
            this.loading_list = false;
        });
    }
    
    deleteProduct(id) {
        this.dialog.delete('Demo Karigar').then((result) => {
            if(result) {
                this.db.post_rqst({ id : id}, 'karigar/demoKarDelete')
                .subscribe(d => {
                    console.log(d);
                    this.getDemoKar('');
                    this.dialog.successfully();
                });
            }
        });
    } 
    
    states:any=[];
    getStateList(){
        this.loading_list = true;  
        this.db.get_rqst('', 'app_master/getStates')
        .subscribe(d => {  
            console.log(d);
            this.loading_list = false;
            this.states = d.states;
        });
    }
    
    districts:any=[];
    getDistrictList(){
        this.loading_list = true;
        
        this.db.post_rqst({'state_name':this.karigarform.state}, 'app_master/getDistrict')
        .subscribe(d => {  
            console.log(d);
            this.loading_list = false;
            this.districts = d.districts;  
        });
    }
    
    numeric_Number(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    
    status(id) {
        this.db.post_rqst({id : id}, 'master/salesStatus')
        .subscribe(d => {
            this.getDemoKar('');
            console.log(d);
        });
    }
    
    updateStatus(i,event,id)
    {
        console.log(id);
        console.log(event);
        console.log(event.checked);
        if(event.checked == false)
        {
            console.log('false');
            
            const dialogRef = this.alrt.open(DeactiveStatusComponent,{
                width: '500px',
                height:'500px',
                
                data: {
                    'id' :id,
                    'type':'sales_executive',
                    'checked' : event.checked,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                if( result ){
                    this.getDemoKar('');
                }
                this.getDemoKar('');
            });
        }
        else if(event.checked == true){
            this.db.post_rqst({'checked' : event.checked, 'id' : id,'login_id':this.db.datauser.id}, 'master/salesStatus')
            .subscribe(d => {
                console.log(d);
                this.dialog.success( 'Status Change successfully ');
                this.getDemoKar('');
            });
        }
    }
    
    reset()
    {
        this.loading_list = true;
        this.db.get_rqst("",'resetDemoData')
        .subscribe(resp=>{
            this.loading_list = false;
            console.log(resp);
        })
    }
    
    exportproductCategory()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'karigar/exportDemoKarigar')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'app/uploads/exports/demoKarigars.csv';
            console.log(d);
        });
    }
}
