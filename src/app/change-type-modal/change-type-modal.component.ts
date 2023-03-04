import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../_services/DatabaseService';

@Component({
  selector: 'app-change-type-modal',
  templateUrl: './change-type-modal.component.html'
})
export class ChangeTypeModalComponent implements OnInit {
  userType:any ={};
  status_type:any={};
  type:any={};
  reason:any ={};
  id: any = [];
  loading_list:any = false;
  savingData = false;
  karigar_id;
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialog) {
      this.id = lead_data.id; 
      this.userType.user_type= lead_data.user_type; 
      this.userType.company_name= lead_data.company_name; 
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.karigar_id = params['karigar_id'];
      });
    }
    
   
    submit(form:any)
    {
      console.log('====================================');
      console.log(this.userType.user_type);
      console.log('====================================');
     this.userType.id = this.id
      this.db.post_rqst({ 'data':this.userType}, 'karigar/karigarType')
      .subscribe(d => {
        console.log(d);
        this.savingData = false;
        this.dialogRef.closeAll();
        this.dialog.success( 'Type successfully Change');
        if(this.userType.user_type == 1){
          this.router.navigate(['karigar-list/1']);
        }
        if(this.userType.user_type == 2){
          this.router.navigate(['dealer-list/1']);
        }
      });
     
    }
  }
