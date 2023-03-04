import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ImportcodeComponent } from './importcode/importcode.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
    selector: 'app-karigar-data',
    templateUrl: './karigar-data.component.html',
    styleUrls: ['./karigar-data.component.scss']
})
export class KarigarDataComponent implements OnInit {
    
    loading_list:boolean=false;
    select_all:any="";
    search:any={};
    constructor(public dialog: MatDialog,public db:DatabaseService,public dlg: DialogComponent) { }
    
    ngOnInit() {
        this.get_garigar_data();
    }
    
    openimportcodemodel(): void {
        const dialogRef = this.dialog.open(ImportcodeComponent, {
            width: '500px',
        });
        
        dialogRef.afterClosed()
        .subscribe(resp=>{
            this.get_garigar_data();
        }) 
    }
    
    opensendmessage(): void {
        const dialogRef = this.dialog.open(SendmessageComponent, {
            width: '500px',
            data:this.assign_arr
        });
    }
    
    promo_karigar:any=[];
    get_garigar_data()
    {
        this.loading_list=true;
        this.db.post_rqst({"search":this.search},"gallary/get_promotion_karigar")
        .subscribe(resp=>{
            console.log(resp);
            this.loading_list=false;
            this.promo_karigar = resp['promo_kar'];

            this.promo_karigar.map(resp=>{
                resp.checked = false;
            });
            console.log(this.promo_karigar);
        })
    }

    assign_arr:any=[]
    select_item(event,indx)
    {
        console.log(event);
        if(event.checked)
        {
            this.assign_arr.push(this.promo_karigar[indx]);
        }
        else
        {
            let idx = this.assign_arr.findIndex(row => row.id == this.promo_karigar[indx].id);
            this.assign_arr.splice(idx,1);
        }
    }

    select_all_data()
    {
        this.promo_karigar.forEach(element => {
            element.checked = this.select_all
        });
        if(this.select_all)
        {
            this.assign_arr = this.promo_karigar;
        }
        else
        {
            this.assign_arr = [];
        }
    }

    deleteKarigar(id)
    {
        this.dlg.delete('Karigar')
        .then((result) => {
            if(result)
            {
                this.db.post_rqst({'id': id}, 'gallary/remove_promo')
                .subscribe(d => {
                    console.log(d);
                    this.get_garigar_data();
                    this.dlg.successfully();
                });
            }
        });
    } 
}