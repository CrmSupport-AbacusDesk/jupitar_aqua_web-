import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
    selector: 'app-product-image-module',
    templateUrl: './product-image-module.component.html',
})
export class ProductImageModuleComponent implements OnInit {
    
    part_data: any = {};
    franchise_id
    loading_list:any = false;
    mode:any;
    image_type:any="";
    uploadUrl:any='';
    
    constructor(public db: DatabaseService, private route: ActivatedRoute,private router: Router,  public dialog: DialogComponent,@Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<ProductImageModuleComponent>)
    {
        console.log(lead_data);
        
        // this.part_data.id = lead_data.id; 
        // this.part_data.reedem_id = lead_data.reedem_id; 
        this.part_data = lead_data.img; 

        // this.part_data.offer_gift_id = lead_data.offer_gift_id; 
        // this.part_data.mode = lead_data.mode; 
        // this.image_type = lead_data.image_type; 
    }
    ngOnInit()
    {
    //     this.uploadUrl = this.db.uploadUrl;

    //     if( this.part_data.mode == 'test1' )
    //     {
    //         this.getProduct();
    //     }
    //     if( this.part_data.mode == 'test2' )
    //     {
    //         this.getcat();
    //     }
    //     if( this.part_data.mode == 'test3' )
    //     {
    //         this.getNews();
    //     }
    //     if( this.part_data.mode == 'test4' )
    //     {
    //         this.getGift();
    //     }
    //     if( this.part_data.mode == 'test5' )
    //     {
    //         this.getKarigarImge();
    //     }
    //     if( this.part_data.mode == 'test6' )
    //     {
    //         this.getKarigarDocument();
    //     }
    //     if( this.part_data.mode == 'test7' )
    //     {
    //         this.getOfferImage();
    //     }
    //     if( this.part_data.mode == 'test15' )
    //     {
    //         this.getGiftImage();
    //     }

    //     if( this.part_data.mode == 'base64' )
    //     {
    //         this.mastergiftimage();
    //     }

    //     if( this.part_data.mode == 'normal' )
    //     {
    //         this.mastergiftimage();
    //     }
    // }
    
    // product:any = {};
    // getProduct() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.id  } , 'master/productImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.product = d.product;
    //         console.log(this.product);
    //     });
    }
    // cat:any = {};
    // getcat() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.id  } , 'master/categoryImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.cat = d.cat;
    //         console.log(this.cat);
            
    //     });
    // }
    // news:any = {};
    // getNews() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.id  } , 'master/newsImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.news = d.news;
    //         console.log(this.news);
            
    //     });
    // }
    
    // gift:any = {};
    // getGift() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.id  } , 'offer/giftImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.gift = d.giftImage;
    //         console.log(this.gift);
    //     });
    // }

    // mastergift:any = {};
    // mastergiftimage() {
    //     this.mastergift=this.part_data.id;
    // }
    
    // karigarImage:any = {};
    // getKarigarImge() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'reedem_id':this.part_data.reedem_id, 'id' : this.part_data.id  } , 'karigar/karigarImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.karigarImage = d.karigarImage;
    //         console.log(this.gift);
    //     });
    // }
    
    // documentImage:any = {};
    // getKarigarDocument() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'reedem_id':this.part_data.reedem_id, 'id' : this.part_data.id  } , 'karigar/karigarDocumentImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.documentImage = d.documentImage;
    //         console.log(this.gift);
    //     });
    // }
    
    // offerImage:any = {};
    // getOfferImage() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.id  } , 'offer/offerImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.offerImage = d.offerImage;
    //         console.log(this.offerImage);
    //     });
    // }
    
    // redeemGiftImage:any = {};
    // getGiftImage() {
    //     this.loading_list = true;
    //     this.db.post_rqst(  {'id' : this.part_data.offer_gift_id  } , 'offer/redeemgiftImage')
    //     .subscribe( d => {
    //         console.log( d );
    //         this.loading_list = false;
    //         this.redeemGiftImage = d.redeemGiftImage;
    //         console.log(this.offerImage);
    //     });
    // }
}
