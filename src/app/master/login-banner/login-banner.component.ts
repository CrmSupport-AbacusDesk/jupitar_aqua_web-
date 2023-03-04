import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {DialogComponent} from '../../dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ConvertArray } from '../../_Pipes/ConvertArray.pipe';
import { ProductImageModuleComponent } from '../product-image-module/product-image-module.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login-banner',
  templateUrl: './login-banner.component.html',
})
export class LoginBannerComponent implements OnInit {
  loading_list:any = false; 

  constructor(public db: DatabaseService, public dialog: DialogComponent , private route: ActivatedRoute , public router:Router, public alrt:MatDialog)
  {}

  ngOnInit() {
    this.loginBanners();
  }


  banner:any = [];
  loginBanners() {
    this.loading_list=true;
    this.db.post_rqst( '', 'master/loginBanners' )
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
    this.formData.append('login_banner'+i,  event.target.files[i] , event.target.files[i].name);

    }
    // this.formData.append('login_banner',  event.target.files[0] , event.target.files[0].name);
    this.loading_list = true;
    this.formData.append('login_banner_length',  event.target.files.length);
    
    this.db.fileData( this.formData, 'login_banner')
    .subscribe(d => { 
      this.loading_list = false; 

      this.formData = new FormData();
      this.dialog.success( 'Login banner successfully Change and please Reload the Page');
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
 openDialog(id ,string ) {
  console.log(id);
  
  const dialogRef = this.alrt.open(ProductImageModuleComponent,

    {
      
      data: {
        'id' : id,
        'mode' : string,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


}
