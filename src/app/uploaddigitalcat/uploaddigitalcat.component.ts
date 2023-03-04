import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../_services/DatabaseService';
import * as _ from 'lodash';  
@Component({
  selector: 'app-uploaddigitalcat',
  templateUrl: './uploaddigitalcat.component.html',
  styleUrls: ['./uploaddigitalcat.component.scss']
})
export class UploaddigitalcatComponent implements OnInit {
  filter:any={};
  // offer_list:any=[];
  loading:boolean = false;
  formData = new FormData();
  exist_coupon:any=[];
  offer_data:any={};
  coupon_ex:any = '';
  file:any = {};
  file_name:any;
  imageError:any='';
  typecheck:any='';
  istrue:boolean=false;
  category:any={};
  // cat_name:any={}
  constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog,public dialogRef: MatDialogRef<UploaddigitalcatComponent>) { }

  ngOnInit() {
  }
  onUploadChange1(evt: any,f) 
  {
        this.imageError = null;
        console.log(f);
        this.file = evt.target.files[0];
        f.resetForm();
        this.file_name = this.file.name;
        const allowed_types = ['application/pdf'];
        this.typecheck = !_.includes("application/pdf", this.file.type)
     if (!_.includes(allowed_types,this.file.type)) {
        this.dialog.error('Only Pdf File Accepted');
        this.file_name = ''
        this.istrue = false;
        return
      }
     if( this.file.size >= 10000000){
        this.dialog.error('PDF file size is too large, maximum file size is 10 MB.');
        this.file_name = ''
        this.istrue = false;
        return
      }
     else{  this.istrue = true;}
  }

  uploadBonus()
    {
      this.istrue = false;
      console.log('this.category.cat_name',this.category.cat_name)
        console.log(this.offer_data.offer_id);
        this.dialogRef.disableClose = true;
        this.loading = true; 
        this.formData.append('pdf', this.file, this.file.name);
        this.formData.append('cat_name',this.category.cat_name);
        this.db.fileData( this.formData, 'product_catalogue')
        .subscribe(d => {  
            this.loading = false;
            console.log(d)
            this.formData = new FormData();
            if(d['status'] == 'EXIST'){
              this.dialog.error( 'This Catalogue Name Already Exist');
              this.category.cat_name ='';
              this.file_name = ''
              // this.dialogRef.close(true);
             } 
            else if(d['status'] == 'SUCCESS'){
                this.dialog.success( 'File Upload Successfully');
                this.dialogRef.close(true);
            } 
              
        },err => {console.log(err);  this.formData = new FormData(); this.loading = false; });
    }
}
