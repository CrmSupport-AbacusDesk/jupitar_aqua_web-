import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { ImportStatusModelComponent } from 'src/app/offer/import-status-model/import-status-model.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-coupon-code-modal',
    templateUrl: './coupon-code-modal.component.html',
    styleUrls: ['./coupon-code-modal.component.scss']
})
export class CouponCodeModalComponent implements OnInit {
    
    coupon:any ={};
    
    // public dialog: DialogComponent,
    // @Inject(MAT_DIALOG_DATA)
    constructor(public db: DatabaseService,public dialog: DialogComponent, @Inject(MAT_DIALOG_DATA) public data:any,  public alrt:MatDialog,public dialogRef: MatDialogRef<CouponCodeModalComponent>) {
        
        console.log('====================================');
        console.log(data.data);
        console.log('====================================');
        this.coupon = data.data
    }
    
    ngOnInit()
    {  
        
    }
    

    updateRemark(id) {
        this.db.post_rqst({ 'id':id, 'remark':this.coupon.remarks }, 'app_master/edit_coupon_remark')
          .subscribe(d => {
            this.dialog.success('Remark has been successfully update');
            this.dialogRef.close(true);
          });
    
      }
    
}
