import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import {MatPaginator, MatTableDataSource, MatDialog, MatDatepicker} from '@angular/material';

@Component({
  selector: 'app-distributor-add',
  templateUrl: './distributor-add.component.html',
  styleUrls: ['./distributor-add.component.scss']
})
export class DistributorAddComponent implements OnInit {

  loading_list = false;
    karigarform: any = {};
    savingData = false;
    states: any = [];
    districts: any = [];
    cities: any = [];
    pincodes: any = [];
    karigar_id:any;
    date1:any;
    
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public matDialog: MatDialog,  public dialog: DialogComponent) { this.date1 = new Date();}
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.karigar_id = params['distributor_id'];
            
            if (this.karigar_id)
            {
                this.getKarigarDetails();
            }
            this.getStateList();
            this.AssignSaleUser();
            this.AssignDistributor();
            this.get_karigar_type();
            this.karigarform.country_id = 99;
        });
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    
    getData:any = {};
    getKarigarDetails() {
        this.loading_list = true;
        this.db.post_rqst(  {'karigar_id':this.karigar_id}, 'karigar/karigarDetail')
        .subscribe(d => {
            this.loading_list = false;
            console.log(d);
            this.karigarform = d.karigar;
            console.log( this.karigarform);
            this.getDistrictList(1);
            this.getCityList(1);
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
    
    getStateList(){
        this.loading_list = true;
        this.db.get_rqst('', 'app_master/getStates')
        .subscribe(d => {  
            this.loading_list = false;  
            this.states = d.states;
        });
    }
    getDistrictList(val){
        this.loading_list = true;
        let st_name;
        if(val == 1)
        {
            st_name = this.karigarform.state;
        }
        this.db.post_rqst({'state_name':st_name}, 'app_master/getDistrict')
        .subscribe(d => {  
            this.loading_list = false;
            this.districts = d.districts;  
        });
    }
    getCityList(val){   
        this.loading_list = true;
        let dist_name;
        if(val == 1)
        {
            dist_name = this.karigarform.district;
        }
        this.db.post_rqst({'district_name':dist_name}, 'app_master/getCity')
        .subscribe(d => {  
            this.loading_list = false;
            this.cities = d.cities;
            this.pincode = d.pins;
        });
    }
    pincode:any = [];
    getPincodeList(val){   
        this.loading_list = true;
        let pincode_name;
        if(val == 1)
        {
            pincode_name = this.karigarform.pincode;
        }
        this.db.post_rqst({'city_name':pincode_name}, 'app_master/getPincodes')
        .subscribe(d => {  
            this.loading_list = false;
            this.pincode = d.pins;
        });
    }
    numeric_Number(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    savekarigarform(form:any)
    {
        this.savingData = true;
        this.loading_list = true;
        this.karigarform.dob = this.karigarform.dob  ? this.db.pickerFormat(this.karigarform.dob) : '';
        this.karigarform.created_by = this.db.datauser.id;
        if(this.karigar_id)
        {
            this.karigarform.karigar_edit_id = this.karigar_id;
            
        }
        else
        {
            this.karigarform.karigar_type = 3;
        }
        this.db.insert_rqst( { 'karigar' : this.karigarform }, 'karigar/addKarigar')
        .subscribe( d => {
            this.savingData = false;
            this.loading_list = false;
            console.log( d );
            if(d['status'] == 'EXIST' ){
                this.dialog.error( ' Mobile No. already exists');
                return;
            }
            this.router.navigate(['distributor-list/1']);
            this.dialog.success('Distributor has been successfully added');
        });
    }
    sales_users:any=[];
    AssignSaleUser()
    {
        this.loading_list = true;
        this.db.get_rqst('','karigar/sales_users')
        .subscribe(d => {
            this.loading_list = false;
            this.sales_users = d.sales_users;
        });
    }
    
    dr_list:any=[];
    AssignDistributor()
    {
        this.loading_list = true;
        this.db.get_rqst('', 'karigar/get_distributor')
        .subscribe(d => {
            console.log(d);
            this.loading_list = false;
            this.dr_list = d.dr_list;
        });
    }
    
    documentChange()
    {
        this.karigarform.document_no=' ';
    }
    onUploadChange(evt: any) {
        const file = evt.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }
    handleReaderLoaded(e) {
        this.karigarform.document_image = 'data:image/png;base64,' + btoa(e.target.result) ;
        console.log( this.karigarform.document_image );
    }
    selectSales()
    {
        this.karigarform.sales_mobile = this.sales_users.filter( x => x.id === this.karigarform.sales_user )[0].phone;
    }
    
    selectDistributor()
    {
        this.karigarform.dis_mobile = this.dr_list.filter( x => x.id === this.karigarform.dis_id )[0].phone;
    }
}

