import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
    selector: 'app-sendmessage',
    templateUrl: './sendmessage.component.html',
    styleUrls: ['./sendmessage.component.scss']
})
export class SendmessageComponent implements OnInit {
    kariger_data:any=[];
    form:any={};
    loading:any=false;
    constructor(public router:ActivatedRoute,public dialogRef: MatDialogRef<SendmessageComponent>,public dialog: DialogComponent, public alrt:MatDialog,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) data) {
        this.kariger_data = data;
    }
    
    ngOnInit() {
        
    }
    
    send_msg()
    {
        this.dialogRef.disableClose = true;
        this.loading = true;
        console.log(this.form);
        console.log(this.kariger_data);
        this.db.post_rqst({"msg":this.form,"data":this.kariger_data},"gallary/send_promo_msg")
        .subscribe(resp=>{
            console.log(resp);
            this.loading = false;
            this.dialog.success("Message Successfully Sent !");
            this.dialogRef.close();
        })
    }
}
