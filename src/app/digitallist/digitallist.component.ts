import { UploaddigitalcatComponent } from './../uploaddigitalcat/uploaddigitalcat.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digitallist',
  templateUrl: './digitallist.component.html',
  styleUrls: ['./digitallist.component.scss']
})
export class DigitallistComponent implements OnInit {
  catalog:any=[];
  loading_list:boolean=false;
  uploadUrl:string='';

  constructor(public alrt:MatDialog,public db:DatabaseService) {
    this.uploadUrl = db.uploadUrl

   }

  ngOnInit() {
    this.digitalist();

  }

  
  digitalist(){

    this.loading_list = true;
    this.db.post_rqst({}, 'app_karigar/product_catalogue_list')
    .subscribe( d => {  
      this.loading_list = false;  
      console.log( d );
      this.catalog = d['pdf'];
      // this.states = d.states;

});
}

delete(id){
this.db.post_rqst({"id":id}, 'app_karigar/delete_product_catalogue')
.subscribe( d => {  
  this.loading_list = true;  
  console.log( d );
  if(d['status'] == 'SUCESS'){
    this.loading_list = false;  
    this.digitalist();
  }
});
}

openDialog(): void {
  const dialogRef = this.alrt.open(UploaddigitalcatComponent,{
      width: '500px',
      
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      console.log("close==>",result)
      this.digitalist();
    }
      // this.getAvailableCoupanList('') ;
  });
}

}
