import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';



@Component({
    selector: 'app-message-history',
    templateUrl: './message-history.component.html',
    styleUrls: ['./message-history.component.scss']
  })
  export class MessageHistoryComponent implements OnInit {
   
    loading_list:boolean=false;
    select_all:any="";
    search:any={};
    current_page:any=1;
    last_page:any;
    constructor(public dialog: MatDialog,public db:DatabaseService,public dlg: DialogComponent) { }
    
    ngOnInit() {
        this.get_data();
    }
    
    promo_karigar:any=[];
    total_karigars:any=0;
    get_data()
    {
        this.loading_list=true;
        this.db.post_rqst({"search":this.search},"gallary/get_promoton_log?page="+ this.current_page)
        .subscribe(resp=>{
            console.log(resp);
            this.loading_list=false;
            this.promo_karigar = resp['promo_kar_log'].data;
            this.current_page = resp['promo_kar_log'].current_page;
            this.last_page = resp['promo_kar_log'].last_page;
            this.total_karigars =resp['promo_kar_log'].total;
            console.log(this.promo_karigar);
        })
    }
    
    redirect_previous() {
        this.current_page--;
        this.get_data();
    }
    redirect_next()
    {
        if (this.current_page < this.last_page)
        { 
            this.current_page++; 
        }
        else
        {
            this.current_page = 1; 
        }
        this.get_data();
    }
}