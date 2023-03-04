import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
    selector: 'app-send-notification',
    templateUrl: './send-notification.component.html',
    styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {
    kariger_data:any=[];
    form:any={};
    loading:any=false;
    constructor(public router:ActivatedRoute,public dialogRef: MatDialogRef<SendNotificationComponent>,public dialog: DialogComponent, public alrt:MatDialog,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) data) {
        console.log(data);
        
        this.kariger_data = data;
    }
    
    ngOnInit() {
        
    }
    
    send_msg()
    {
        this.loading = true;
        this.dialogRef.disableClose = true;
        console.log(this.form);
        console.log(this.kariger_data);
        this.db.post_rqst({"msg":this.form,"data":this.kariger_data},"gallary/send_promo_notification")
        .subscribe(resp=>{
            console.log(resp);
            this.loading = false;
            this.dialog.success("Notification Successfully Sent !");
            this.dialogRef.close();
        })
    }
}
