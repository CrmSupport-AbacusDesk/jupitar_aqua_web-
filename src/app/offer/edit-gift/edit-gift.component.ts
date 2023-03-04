import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-gift',
  templateUrl: './edit-gift.component.html',
})
export class EditGiftComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  mode:any;
  savingData = false;
  btn_value = false;
  gift_id;
  offer_id;
  type:any;
  previousGift:any =[]
  newGift:any=[];
  total_redeem:any;
  image = new FormData();
  offer:any = {};
  uploadUrl:any=''
  filter: any;
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<EditGiftComponent>) {
      console.log(lead_data);
      
      this.uploadUrl = this.db.uploadUrl;
      
      
      this.data.id = lead_data.id;
      this.previousGift = lead_data.previousData
      
      this.data.total_redeem = lead_data.total_redeem;
      this.offer.offer_id=lead_data.offer_id;
      this.type=lead_data.type;
      
      console.log(this.data.id);
      this.total_redeem =  this.data.total_redeem;
    }
    ngOnInit() {
      this.getGiftList();
      this.uploadUrl = this.db.uploadUrl;
      this.giftDetail();
    }
    
    checkValue(){
      this.btn_value = true
    }
    
    
    giftDetail() {
      if(!this.data.id)return;
      this.loading_list = true;
      this.db.post_rqst(  {'id' : this.data.id } , 'offer/giftEditDetail')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.offer = d.gift;
      });
    }
    
    numeric_Number(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    
    giftlisting:any=[];
    getGiftList() 
    {
      this.filter='';
      this.db.post_rqst(  {'filter':this.filter }, 'offer/dropDownGift')
      .subscribe((d)=> {
        this.loading_list = false;
        console.log(d);
        console.log(this.previousGift.length);
        this.giftlisting = d.gift;
        this.newGift = [];
        
        let item = {};
        if(this.previousGift.length >= 0){
          for(let i = 0; i < this.giftlisting.length; i++) {
            item = this.previousGift.findIndex((row) => row.master_gift_id === this.giftlisting[i].id);
            console.log('item 111',item);
            
            if(item === -1) // Value inside 
            {
              this.newGift.push(this.giftlisting[i]);
            }
          } console.log("new item====>",this.newGift);
        }
      });
    }
    
    
    
    
    giftList:any = [];
    gift :any = {};
    addgiftList()
    {
      
      for (let i = 0; i < this.giftList.length; i++) {
        if( this.gift.gift_title ===  this.giftList[i].gift_title ){
          this.dialog.success('Gift Already Exist, Please Delete it first.');
          return;
        }
      }
      this.giftList.push( this.gift );
      console.log(this.giftList);
      this.gift={};
      this.btn_value = false
    }
    
    RemoveItem(i)
    {
      console.log(i);
      this.giftList.splice(i,1);
      this.dialog.success('Item has been deleted.');
    }
    
    addoffer(form:any)
    {
      this.offer.id=this.data.id;
      this.offer.created_by=this.db.datauser.id;
      
      let offer_id = this.offer.offer_id
      
      
      if(this.giftList != ''){
        this.offer =[];
        this.offer.created_by=this.db.datauser.id;
      }
      
      console.log(this.offer.created_by);
      
      
      // if( !this.offer.gift_image ){
      //   this.dialog.warning('Required Gift Image!');
      //   return;
      // }
      this.savingData = true;
      this.db.post_rqst( { 'id': this.data.id , 'offer_id':offer_id, 'offer':this.offer, 'gift' : this.giftList }, 'offer/giftEdit')
      .subscribe( d => {
        if(this.data.id )
        {
          this.dialog.success('Gift Successfully Update!');
        }
        else
        {
          this.dialog.success('Gift Successfully Added!');
        }
        
        this.offer.id = d['offer_id'];
        console.log(this.offer.id);
        
        if(this.image)
        {
          this.image.append("offer_id",this.offer.id);
          this.db.fileData(this.image,"giftImage")
          .subscribe(resp=>{
            console.log(resp);
          })
        }
        
        this.savingData = false;
        this.dialogRef.close(true);
        console.log( d );
      });
    }
    
    onNoClick(): void{
      this.dialogRef.close();
    }
    

    tmpimg:any;
    onUploadChange2(data: any) {
      let files = data.target.files[0];
      if (files) 
      {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.tmpimg = e.target.result;
          this.offer.image = e.target.result;
        }
        reader.readAsDataURL(files);
      }
      this.image.append("image",data.target.files[0],data.target.files[0].name);
    }
    
    
  }