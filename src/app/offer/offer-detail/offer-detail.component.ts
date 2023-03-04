import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDatepicker} from '@angular/material';
import {GiftRedeemModuleComponent } from '../gift-redeem-module/gift-redeem-module.component';
import {TransferCodeComponent } from '../transfer-code/transfer-code.component';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import {ProductImageModuleComponent } from '../../master//product-image-module/product-image-module.component';
import {ImportStatusModelComponent } from '../../offer/import-status-model/import-status-model.component';
import {EditGiftComponent } from '../../offer/edit-gift/edit-gift.component';
import {DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';
import {ReopenRemarkModleComponent } from '../reopen-remark-modle/reopen-remark-modle.component';
import {ChangeStatusComponent} from '../../gift-gallery/change-status/change-status.component';
import {CouponSummaryModleComponent } from '../coupon-summary-modle/coupon-summary-modle.component';
import {TermConditionImageComponent } from '../term-condition-image/term-condition-image.component';
import * as moment from 'moment';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.component.html',
})
export class OfferDetailComponent implements OnInit {

    today:any = moment().format("YYYY-MM-DD");

    
    offer_id;
    loading_list = false;
    filter:any = {};
    savingData = false;
    filtering : any = false;
    logs:any=[];
    uploadUrl:any='';
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent, public alrt:MatDialog ) {}
    
    mode:any=2;
    ngOnInit() {
        this.uploadUrl = this.db.uploadUrl;
        this.route.params.subscribe(params => {
            this.offer_id = params['offer_id'];
            this.getOfferDetails();
            this.getAvailableCoupanList();
            this.getStateList();
        });
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    
    getData:any = {};
    gift:any = [];
    getOfferDetails() {
        this.loading_list = true;
        this.db.post_rqst(  {'offer_id':this.offer_id}, 'offer/offerDetail')
        .subscribe(d => {
            console.log(d);
            this.getData = d.offer;
            this.gift = d.gift;
            
            this.logs =d.logs;
            
            if(this.getData.offer_status=="Active")
            {
                this.getData.newsStatus=true;
            }
            else if(this.getData.offer_status=="Deactive")
            {
                this.getData.newsStatus=false;
            }
            for (let i = 0; i < this.gift.length; i++)
            {
                if(this.gift[i].status=="Active")
                {
                    this.gift[i].giftStatus=true;
                    console.log( this.gift[i].newsStatus);
                }
                else if(this.gift[i].status=="Deactive")
                {
                    this.gift[i].giftStatus=false;
                    console.log(this.gift[i].newsStatus);
                    
                }
            }   
            this.loading_list = false;
        });
    }
    
    last_page: number ;
    current_page = 1;
    redirect_previous2() {
        this.current_page--;
        this.getAvailableCoupanList();
    }
    redirect_next2() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getAvailableCoupanList();
    }
    
    
    
    redirect_previous1() {
        this.current_page--;
        this.getScannedList();
    }
    redirect_next1() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getScannedList();
    }
    
    
    
    redirect_previous3() {
        this.current_page--;
        this.getRedeemList();
    }
    redirect_next3() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getRedeemList();
    }
    
    redirect_previous4() {
        this.current_page--;
        this.getCoupon_summary();
    }
    redirect_next4() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getCoupon_summary();
    }
    
    requestchangeStatus(i,id,status)
    {
        console.log(status);
        
        const dialogRef = this.alrt.open(ChangeStatusComponent,
            {
                width: '500px',
                // height:'500px',
                
                data: {
                    'id' : id,
                    'status' : status,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if( result ){
                    this.getRedeemList();
                }
            });
            
        }
        
        redeem_coupon_count:any = 0;
        coupon:any= [];
        avialable_coupon_count:any = 0;
        coupon_redeem_count_gift: any = 0;
        getAvailableCoupanList() {
            this.loading_list = true;
            
            this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
            this.filter.used_date = this.filter.used_date  ? this.db.pickerFormat(this.filter.used_date) : '';
            this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
            if( this.filter.date || this.filter.used_date || this.filter.end_date)this.filtering = true;
            
            this.filter.offer_id = this.offer_id;
            this.db.post_rqst(  {'filter': this.filter }, 'offer/couponAvailableList?page=' + this.current_page )
            .subscribe(d => {
                console.log(d);
                this.coupon = d.avialable_coupon.data;
                this.current_page = d.avialable_coupon.current_page;
                this.last_page = d.avialable_coupon.last_page;
                
                this.avialable_coupon_count = d.avialable_coupon.total;
                
                this.redeem_coupon_count = d.coupon_redeem_count;
                this.coupon_redeem_count_gift = d.coupon_redeem_count_gift;
                this.sccaned_coupon_count = d.coupon_scanned_count;
                this.loading_list = false;
            });
        }
        
        scanned_coupon:any=[];
        sccaned_coupon_count:any = 0;
        getScannedList() {
            console.log(this.db.datauser);
            
            this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
            this.filter.used_date = this.filter.used_date  ? this.db.pickerFormat(this.filter.used_date) : '';
            this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
            if( this.filter.date || this.filter.used_date || this.filter.end_date)this.filtering = true;
            
            this.loading_list = true;
            this.filter.offer_id = this.offer_id;
            this.db.post_rqst(  {'filter': this.filter}, 'offer/couponScannedList')
            .subscribe(d => {
                console.log(d);
                this.scanned_coupon =  d.scanned_coupon.data;
                this.sccaned_coupon_count = d.scanned_coupon.total;
                
                this.redeem_coupon_count = d.coupon_redeem_count;
                this.avialable_coupon_count = d.coupon_available_count;
                this.loading_list = false;
                
            });
        }
        
        reedam: any = [];
        total_reedam = 0;
        getRedeemList() 
        {
            this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
            this.filter.start_date = this.filter.start_date  ? this.db.pickerFormat(this.filter.start_date) : '';
            this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
            if( this.filter.date )this.filtering = true;
            
            this.filter.offer_id = this.offer_id;
            this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/redeemList')
            .subscribe( d => {
                console.log(d);
                
                this.total_reedam =d.redeem.total;
                this.reedam = d.redeem.data;
            });
        }
        
        coupon_code_summary:any=[];
        getCoupon_summary() 
        {
            this.loading_list = true;
            this.filter.offer_id = this.offer_id;
            this.filter.mode = 0;
            
            this.db.post_rqst(  { 'filter': this.filter , 'login':this.db.datauser}, 'offer/Coupon_summary?page=' + this.current_page)
            .subscribe( d => {
                console.log(d);
                this.coupon_code_summary = d.Coupon_code_summary.data;
                this.current_page = d.Coupon_code_summary.current_page;
                this.last_page = d.Coupon_code_summary.last_page;
                this.loading_list = false;
            });
        }
        
        
        addOffer:any={};
        states:any=[];
        getStateList(){
            this.db.post_rqst({'offer_id': this.offer_id}, 'offer/getEditStates')
            .subscribe( d => {  
                console.log( d );
                this.states = d.states;
                this.getDistrictList();
            });
        }
        allState(){
            if( !this.addOffer.allStates ){
                for (let i = 0; i < this.states.length; i++) {
                    this.states[i].selected = false;
                }
            }else{
                for (let i = 0; i < this.states.length; i++) {
                    this.states[i].selected = true;
                }
            }
            this.getDistrictList();
        }
        
        districts:any=[];
        getDistrictList(){
            this.loading_list = true;
            this.db.post_rqst( { 'state': this.states, 'offer_id':this.offer_id }, 'offer/getEditDistrict')
            .subscribe(d => {  
                this.loading_list = false;
                this.districts = d.state;
            });
        }
        
        
        allDistrict(){
            
            if( !this.addOffer.allDistrict ){
                for (let i = 0; i < this.districts.length; i++) {
                    this.districts[i].stateWiseDistrict = false;
                    if(this.districts[i].selected){
                        for (let x = 0; x < this.districts[i].districts.length; x++) {
                            this.districts[i].districts[x].selected = false;
                        }
                    }
                }
            }else{
                for (let i = 0; i < this.districts.length; i++) {
                    this.districts[i].stateWiseDistrict = true;
                    
                    if(this.districts[i].selected){
                        for (let x = 0; x < this.districts[i].districts.length; x++) {
                            this.districts[i].districts[x].selected = true;
                        }
                    }
                }
            }
            
        }
        
        
        allStateWiseDistrict(index){
            
            for (let x = 0; x < this.districts[ index ].districts.length; x++) {
                if( this.districts[ index ].stateWiseDistrict == true ){
                    
                    this.districts[ index ].districts[x].selected = true;
                }else{
                    
                    this.districts[ index ].districts[x].selected = false;
                }
            }
            
            console.log( this.districts );
        }
        
        saveOffer(form:any) {
            
            this.savingData = true;
            this.loading_list =true;
            this.districts.created_by = this.db.datauser.id;
            this.db.post_rqst( {  'area' : this.districts, 'login_id' :this.db.datauser.id ,'offer_id':this.offer_id }, 'offer/updateOfferArea')
            .subscribe( d => {
                this.loading_list =false;
                this.savingData = false;
                this.dialog.success( 'Area successfully Update');
                this.getOfferDetails();
                this.getStateList();
            });
        }
        
        deleteGift(id) {
            this.dialog.delete('Gift').then((result) => {
                if(result) {
                    this.db.post_rqst({'id': id, 'offer_id' : this.offer_id, 'login_id': this.db.datauser.id}, 'offer/removeGift')
                    .subscribe(d => {
                        console.log(d);
                        this.getOfferDetails();
                        this.dialog.successfully();
                    });
                }
            });
        } 
        
        reponeCoupon(id) {
            const dialogRef = this.alrt.open(ReopenRemarkModleComponent,{
                width: '500px',
                // height:'500px',
                data: {
                    'id' : id,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                if( result ){
                    this.getScannedList();
                    
                }
            });
        }
        
        deleteAvailable(id) {
            this.dialog.delete('Gift').then((result) => {
                if(result) {
                    this.db.post_rqst({'id': id}, 'offer/removeAvailable')
                    .subscribe(d => {
                        console.log(d);
                        this.getAvailableCoupanList();
                        this.dialog.successfully();
                    });
                }
            });
        } 
        
        
        transferCode()
        {
            const dialogRef = this.alrt.open(TransferCodeComponent,{
                width: '500px',
                // height:'500px',
                data: {
                    'scanned_coupon' : this.coupon,
                    'offer_id' : this.getData.id,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                if( result ){
                    this.getAvailableCoupanList();
                }
            });
        }
        
        
        deletecheckavailable() {
            this.dialog.delete('Gift').then((result) => {
                if(result) {
                    this.db.post_rqst({ 'scanned_coupon' : this.coupon ,'offer_id':this.offer_id ,'login_id':this.db.datauser.id }, 'offer/couponDelete')
                    .subscribe(d => {
                        console.log(d);
                        this.getOfferDetails();
                        this.getAvailableCoupanList();
                        this.dialog.successfully();
                    });
                }
            });
        } 
        giftRedeem(id , point)
        {
            console.log( point );
            
            if( point == 0 ){
                console.log('in');
                return;
            }
            const dialogRef = this.alrt.open(GiftRedeemModuleComponent,{
                width: '650px',
                // height:'500px',
                
                data: {
                    'gift_id' : id,
                    'offer_id'  :   this.offer_id,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
            });
            
        }
        updateStatus(event)
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
                        'id' : this.getData.id,
                        'type':'offer',
                        'checked' : event.checked,
                    }
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog result: ${result}`);
                    if( result ){
                        this.getOfferDetails();
                        
                    }
                });
            }
            else if(event.checked == true)
            {
                this.db.post_rqst({'checked' : event.checked, 'id' : this.getData.id , 'login_id' : this.db.datauser.id}, 'master/offerStatus')
                .subscribe(d => {
                    console.log(d);
                    this.dialog.success( 'Gift Status Change successfully ');
                    this.getOfferDetails();
                });
            }
            this.getOfferDetails();
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
                        this.getOfferDetails();
                    }
                    this.getOfferDetails();
                });
            }
            else if(event.checked == true)
            {
                this.db.post_rqst({'checked' : event.checked, 'id' : id,'login_id':this.db.datauser.id}, 'master/giftStatus').subscribe(d => {
                    console.log(d);
                    this.dialog.success( 'Gift Status Change successfully ');
                    
                    this.getOfferDetails();
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
        edit(){
            this.router.navigate(['/edit-offer/' +this.offer_id]);
        }
        
        
        allCoupon(){
            if( !this.addOffer.all_coupon ){
                for (let i = 0; i < this.coupon.length; i++) {
                    this.coupon[i].selected_coupon = false;
                }
            }else{
                for (let i = 0; i < this.coupon.length; i++) {
                    this.coupon[i].selected_coupon = true;
                }
            }
            this.countSelected();
        }
        
        count: any = 0;
        countSelected(){
            this.count = 0;
            
            for (let i = 0; i < this.coupon.length; i++) {
                if( this.coupon[i].selected_coupon )
                this.count++;
                
            }
            if(this.count<this.coupon.length)
            {
                this.addOffer.all_coupon=false; 
            }
            else
            {
                this.addOffer.all_coupon=true; 
                
            }
        }
        
        coupon_ex:any = '';
        file:any = {};
        onUploadChange1(evt: any,f)
        {
            this.file = evt.target.files[0];
            f.resetForm();
            console.log(this.file);
            this.uploadCoupon();
        }
        
        
        formData = new FormData();
        exist_coupon:any=[];
        uploadCoupon(){
            this.loading_list = true; 
            this.formData.append('coupon', this.file, this.file.name);
            this.formData.append('offer_id', this.offer_id);
            
            this.db.fileData( this.formData, 'app_master/couponExcel')
            .subscribe(d => {  
                this.loading_list = false;
                this.formData = new FormData();
                if(d['status'] == 'BLANK'){
                    this.dialog.success('File is Blank');
                    return;
                }
                
                if(d['status'] == 'INCORRECT FILE'){
                    this.dialog.success('File Data is incorrect');
                    return;
                }
                
                
                if(d['status'] == 'INCORRECT FORMAT'){
                    this.dialog.success('File Format is incorrect! only CSV Support');
                    return;
                }
                
                if(d['status'] == 'SIZE SHORT'){
                    this.dialog.success('CSV File To Sort ');
                    return;
                }
                
                if(d['status'] == 'UPLOAD' )
                {
                    
                    
                    if( d['exist_coupon'].length > 0 )
                    {
                        const dialogRef = this.alrt.open(ImportStatusModelComponent,{
                            width: '650px',
                            // height:'500px',
                            data: {
                                'exist_coupon' : d['exist_coupon'],
                            }
                        });
                        dialogRef.afterClosed().subscribe(result => {   
                            console.log(`Dialog result: ${result}`);
                        });
                        
                        if(d['upload_count'] > 0   ){
                            
                            
                        }else{
                            this.dialog.success(d['exist_coupon'].length+' Coupon Already Exist!');
                        }
                    }
                    if(d['upload_count'] > 0   ){
                        this.dialog.success(d['upload_count']+' Coupon Upload Successfully!');
                    }
                }
                this.getAvailableCoupanList();
            },err => {console.log(err);  this.formData = new FormData(); this.loading_list = false; });
            
            
        }
        
        editgift(id,total_redeem, type) {
            console.log(type);
            
            const dialogRef = this.alrt.open(EditGiftComponent,{
                width: '800px',
                data: {
                    'id' : id,
                    'offer_id':this.offer_id,
                    'total_redeem':total_redeem,
                    'type':type,
                    'previousData':this.gift
                }
            });
            dialogRef.afterClosed().subscribe( r => {
                if( r ) this.getOfferDetails();
            });
        }
        
        coupon_summary() 
        {   
            const dialogRef = this.alrt.open(CouponSummaryModleComponent,{
                width: '800px',
                data: {
                    'offer_id':this.offer_id,
                }
            });
            dialogRef.afterClosed().subscribe( r => {
                if( r ) this.getOfferDetails();
            });
        }
        
        addTermConditionImage() 
        {   
            const dialogRef = this.alrt.open(TermConditionImageComponent,{
                width: '500px',
                // height:'500px',
                data: {
                    'offer_id':this.offer_id,
                }
            });
            dialogRef.afterClosed().subscribe( r => {
                // if( r ) this.getOfferDetails();
                this.getOfferDetails();
            });
        }

        
    }
    
    