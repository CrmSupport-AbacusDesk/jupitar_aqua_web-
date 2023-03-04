import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';


@Component({
    selector: 'app-notification-history',
    templateUrl: './notification-history.component.html',
    styleUrls: ['./notification-history.component.scss']
})
export class NotificationHistoryComponent implements OnInit {
    
    loading_list:boolean=false;
    select_all:any="";
    search:any={};
    current_page:any=1;
    last_page:any;
    constructor(public dialog: MatDialog,public db:DatabaseService,public dlg: DialogComponent) { }
    
    ngOnInit() {
        this.get_data();
    }
    
    karigar_notification:any=[];
    total_karigars:any=0;
    get_data()
    {
        this.loading_list=true;
        this.db.post_rqst({"search":this.search},"gallary/get_karigar_notif?page="+ this.current_page)
        .subscribe(resp=>{
            console.log(resp);
            this.loading_list=false;
            this.karigar_notification = resp['notifications'].data;
            this.current_page = resp['notifications'].current_page;
            this.last_page = resp['notifications'].last_page;
            this.total_karigars =resp['notifications'].total;
            console.log(this.karigar_notification);
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