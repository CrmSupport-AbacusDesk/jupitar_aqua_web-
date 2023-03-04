import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductImageModuleComponent } from '../master/product-image-module/product-image-module.component';
import { DatabaseService } from '../_services/DatabaseService';

@Component({
  selector: 'app-app-banner',
  templateUrl: './app-banner.component.html',
  styleUrls: ['./app-banner.component.scss']
})
export class AppBannerComponent implements OnInit {

  loading_list:any = false; 
  constructor(public db: DatabaseService, public dialog: DialogComponent , private route: ActivatedRoute , 
    public router:Router, public alrt:MatDialog)
  {}

  ngOnInit() {
    this.loginBanners();
  }


  banner:any = [];
  loginBanners() {
    this.loading_list=true;
    this.db.post_rqst( '', 'master/appBanners' )
    .subscribe(d => {
        this.loading_list = false;
        console.log(this.loading_list);
        this.banner = d.banner;
    });
  }

  


  formData = new FormData();

  profilefileChange(event){  
        
    for(var i=0; i<event.target.files.length; i++)
    {
    this.formData.append('app_banner'+i,  event.target.files[i] , event.target.files[i].name);

    }
    // this.formData.append('app_banner',  event.target.files[0] , event.target.files[0].name);
    this.loading_list = true;
    this.formData.append('app_banner_length',  event.target.files.length);
    
    this.db.fileData( this.formData, 'app_banner')
    .subscribe(d => { 
      this.loading_list = false; 

      this.formData = new FormData();
      this.dialog.success( 'App banner successfully Change and please Reload the Page');
      this.loginBanners();

    },err => {
      console.log(err);   
      this.loading_list = false; 
    
    });
  
}
deleteImage(id) {
  this.loading_list = true;
  this.db.post_rqst({'id' : id}, 'master/bannerDelete')
    .subscribe(d => {
      this.loading_list = false; 
      console.log(d);
      this.loginBanners();
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


}
