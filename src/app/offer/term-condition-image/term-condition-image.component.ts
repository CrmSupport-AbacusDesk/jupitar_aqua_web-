import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-term-condition-image',
  templateUrl: './term-condition-image.component.html',
})
export class TermConditionImageComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  savingData = false;
  offer_id;
  uploadUrl:any='';
  englishImage = new FormData();
  hindiImage = new FormData();
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<TermConditionImageComponent>) {
      
      this.offer_id= lead_data.offer_id;
      
    }
    ngOnInit() {
      this.uploadUrl = this.db.uploadUrl;
      this.getOfferDetails();
    }
    
    
    getData:any = {};
    getOfferDetails() {
      this.loading_list = true;
      this.db.post_rqst(  {'offer_id':this.offer_id}, 'offer/offerDetail')
      .subscribe(d => {
        this.loading_list = false;
        console.log(d);
        this.offer = d.offer;
      });
    }
    
    offer:any = {};
    addoffer(form:any)
    {
      
      // this.offer.offer_id = this.offer_id;
      // this.savingData = true;
      // this.db.post_rqst( { 'offer':this.offer }, 'offer/addTermConditionImage')
      // .subscribe( d => {
      //   this.savingData = false;
      //   this.dialog.success('Gift Successfully Update!');
      //   this.dialogRef.close(true);
      //   console.log( d );
      // });

      if(this.englishImage)
      {
        console.log(this.offer);
        
          this.englishImage.append("offer_id",this.offer.id);
          this.db.fileData(this.englishImage,"termEnglishImage")
          .subscribe(resp=>{
              console.log(resp);
          })
      }
      
      if(this.hindiImage)
      {
          this.hindiImage.append("offer_id",this.offer.id);
          this.db.fileData(this.hindiImage,"termHindiImage")
          .subscribe(resp=>{
              console.log(resp);
          })
      }

      this.dialogRef.close();

    }


    
    onNoClick(): void{
      this.dialogRef.close();
    }
    
    tmpeng:any;
    EnglishImage(data)
    {
      let files = data.target.files[0];
      if (files) 
      {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.tmpeng = e.target.result
        }
        reader.readAsDataURL(files);
      }
      this.englishImage.append("english_image",data.target.files[0],data.target.files[0].name);
    }
    
    tmphin:any;
    HindiImage(data)
    {
      let files = data.target.files[0];
      if (files) 
      {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.tmphin = e.target.result
          console.log(this.tmphin);
        }
        reader.readAsDataURL(files);
      }
      this.hindiImage.append("hindi_image",data.target.files[0],data.target.files[0].name);
    }
    
    
  }
  