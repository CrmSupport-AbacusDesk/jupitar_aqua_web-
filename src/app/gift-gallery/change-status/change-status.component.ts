import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
    selector: 'app-change-status',
    templateUrl: './change-status.component.html',
})
export class ChangeStatusComponent implements OnInit {
    
    data: any = {};
    loading_list:any = false;
    mode:any;
    savingData = false;
    gift_id;
    offer:any = {};
    
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
        @Inject(MAT_DIALOG_DATA) public model_data: any, public dialogRef: MatDialogRef<ChangeStatusComponent>) {
            console.log(model_data);
            
            this.data.id = model_data.id; 
            this.data.gift_status = model_data.status; 
            
        }
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.gift_id = params['gift_id'];
                this.offer.gift_status = this.data.gift_status; 
                console.log( this.offer );
                
            });
        }
        
        addoffer(form:any)
        {
            this.savingData = true;
            this.db.post_rqst( { 'status' : this.offer ,'id': this.data.id }, 'offer/redeemStatus')
            .subscribe( d => {
                this.savingData = false;
                this.dialog.success( 'Status successfully Change');
                this.dialogRef.close(true);
                console.log( d );
            });
        }
        
        onNoClick(): void{
            this.dialogRef.close();
        }
    }
    