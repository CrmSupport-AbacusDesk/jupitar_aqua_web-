import {Component,OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';
import { MatDialog } from '@angular/material';




@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
})
export class CompanyProfileComponent implements OnInit {

  loading_list = false;
  getData: any = {};


  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent,public alrt:MatDialog) {}

  ngOnInit() {
    this.getProductList();

  }

  getProductList() 
  {
    this.loading_list = true;
    this.db.post_rqst( '', 'master/get_company_profile' )
    .subscribe( d => {
      //console.log(d);
      this.loading_list = false;
      this.profile.about = d.getData.about;
      this.profile.date_created = d.getData.date_created;
      this.profile.profile_banner  = d.getData.profile_banner;
      
    });
  }
  

  

 
  profile:any= {};
  saveloyality() {

    this.loading_list = true;
    this.profile.created_by = this.db.datauser.id;

    this.db.post_rqst( { 'profile' : this.profile }, 'master/company_profile')
    .subscribe( d => {
      //console.log( d );
      this.loading_list = false;
      if(d['status'] == 'SUCCESS' ){
        this.dialog.success( 'Company Profile Successfully Updated');
      }
    });
  }

  onUploadChange1(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded1(e) {
    this.profile.profile_banner = 'data:image/png;base64,' + btoa(e.target.result) ;
  }

   

}
