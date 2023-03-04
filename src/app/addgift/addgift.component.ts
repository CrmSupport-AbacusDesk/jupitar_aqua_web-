import {Component,OnInit} from '@angular/core';
import {DatabaseService} from '../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';
import {SessionStorage} from '../_services/SessionService';
import { ImportStatusModelComponent } from '../offer/import-status-model/import-status-model.component';
import {MatDialog} from '@angular/material';
// import { NgxEditorModule } from 'ngx-editor';



@Component({
  selector: 'app-addgift',
  templateUrl: './addgift.component.html',
})
export class AddgiftComponent implements OnInit {
  
  formData = new FormData();
  loading_list = false;
  gift_id:any =''
  addOffer: any = {};
  addArea: any = {};
  addGift: any = {};
  savingData = false;
  states: any = [];
  districts: any = [];
  cities: any = [];
  pincodes: any = [];
  offer_id: any = 0;
  mindate:any = new Date();
  urlPath: string = '';
  img_id:any 

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent ,  public alrt:MatDialog) {
      this.urlPath = this.db.uploadUrl;

      this.route.params.subscribe(params => {
        console.log(params)
        this.gift_id =  params.id
        this.img_id =  params.id

      });
      
      if(this.gift_id){
        this.giftListEdit();
      }
      
    }
    
    ngOnInit() {

      this.urlPath = this.db.uploadUrl;
      
    }
    
    
    numeric_Number(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    
    onUploadChange2(evt: any) {
      const file = evt.target.files[0];
      console.log('File Property ->', file.size);
      if(file.size > 1014406) {
        this.dialog.error('Image size more than 1 Mb is not allowed.');
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded2.bind(this);
        reader.readAsBinaryString(file);
      }
    }
    
    
    handleReaderLoaded2(e) {
      this.img_id ='';
      this.gift.image = 'data:image/png;base64,' + btoa(e.target.result) ;
    }
    
    
    giftList:any = [];
    gift :any = {};
    addgiftList()
    {
      if( !this.gift.gift_title ){
        this.dialog.warning('Please Enter Title!');
        return;
      }
      // if( !this.gift.coupan_points ){
      //   this.dialog.warning('Please Enter Coupan Points!');
      //   return;
      // }
      if( !this.gift.gift_specification ){
        this.dialog.warning('Please Enter Gift Specification!');
        return;
      }
      if( !this.gift.image ){
        this.dialog.warning('Please Choose at least one Image ');
        return;
      }
      for (let i = 0; i < this.giftList.length; i++) {
        if( this.gift.gift_title ===  this.giftList[i].gift_title ){
          this.dialog.success('Part Number Already Exist, Please Delete it first.');
          return;
        }
      }
      this.giftList.push( this.gift );
      this.savingData = true;
      this.giftList.id = this.gift_id;
      this.db.insert_rqst( { 'gift' : this.gift, 'login_id' :this.db.datauser.id }, 'offer/masterGiftAdd')
      .subscribe( d => {
        this.savingData = false;
        console.log( d );
        this.router.navigate(['gifts']);
        if(d['status'] == 'EXIST' ){
          this.dialog.error( 'Offer Code Already exists');
          return;
        }
        
      });
    }
    
    RemoveItem(i)
    {
      console.log(i); 
      this.giftList.splice(i,1);
      this.dialog.success('Item has been deleted.');
    }
    
    
    giftListEdit(){
      this.loading_list = true;
      this.db.insert_rqst( { 'id' : this.gift_id , 'login_id' :this.db.datauser.id }, 'offer/master_gift_detail')
      .subscribe( d => {
        console.log(d);

        this.gift = d.gift_detail;
        console.log(this.gift);
        this.loading_list = false;

      });
      // this.db.insert_rqst( { 'gift_id':this.gift_id ,}, 'offer/masterGiftEdit')
      // .subscribe( d => {
      //   this.savingData = false;
      //   console.log( d );
      //   this.gift = d['gift']
      
      
      // });
    }
    
    saveOffer(form:any) {
      // if( !this.addOffer.offer_banner ){
      //   this.dialog.warning('Please Upload Offer Banner Image');
      //   return;
      // }
      this.savingData = true;
      
      console.log(this.giftList);
      this.giftList.id = this.gift_id;
      console.log(this.giftList.id);
      
      
      
      this.db.insert_rqst( { 'gift' : this.giftList , 'login_id' :this.db.datauser.id }, 'offer/masterGiftAdd')
      .subscribe( d => {
        this.savingData = false;
        console.log( d );
        if(d['status'] == 'EXIST' ){
          this.dialog.error( 'Offer Code Already exists');
          return;
        }
        
      });
    }
    
  }
  