import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-karigar-detail-module',
  templateUrl: './karigar-detail-module.component.html',
  styleUrls: ['./karigar-detail-module.component.scss']
})
export class KarigarDetailModuleComponent implements OnInit {
  id:any='';
  filter:any={};
  current_page = 1;
  last_page: number ;
  karigar:any=[];
  total_karigars = 0;
  loading_list = false;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<KarigarDetailModuleComponent>,public db: DatabaseService) { 
    this.filter.sales_user=data.id;
    this.filter.status=data.status;
  }

  ngOnInit() {
    this.getKarigarList();
  }
  redirect_previous() {
    this.current_page--;
    this.getKarigarList();
  }
  redirect_next() {
    if (this.current_page < this.last_page) { this.current_page++; }
    else { this.current_page = 1; }
    this.getKarigarList();
  }
  
  getKarigarList()
  {
    // this.loading_list = true;
    this.db.post_rqst(  { 'filter': this.filter , 'login':this.db.datauser}, 'karigar/karigarList?page=' + this.current_page)
    .subscribe( d => {
      console.log(d);
      this.current_page = d.karigars.current_page;
      this.last_page = d.karigars.last_page;
      this.total_karigars =d.karigars.total;
      this.karigar=d.karigars.data;
      console.log(this.karigar);
      // this.loading_list = false;
      
    });
  }

  exportKarigar()
  {
    this.filter.mode = 1;
    this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'karigar/exportKarigar')
    .subscribe( d => {
      document.location.href = this.db.myurl+'/app/uploads/exports/Karigars.csv';
      console.log(d);
    });
  }
}
