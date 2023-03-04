import { Component, OnInit, Inject } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
    selector: 'app-feedback-reply-modle',
    templateUrl: './feedback-reply-modle.component.html',
    styleUrls: ['./feedback-reply-modle.component.scss']
})
export class FeedbackReplyModleComponent implements OnInit {
    
    karigar:any = {};
    loading_list = false;
    upload_url:any='';
    
    constructor(public dialog: DialogComponent, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FeedbackComponent>, public db:DatabaseService) { 
        console.log(data);
        this.karigar.id = data.id;
        this.karigar.login_id = this.db.datauser.id;
        this.upload_url = this.db.uploadUrl;
        this.startTimer();
    }
    
    ngOnInit() {
        this.get_msgs();
    }
    
    timeLeft: number = 30;
    interval;
    
    startTimer() {
        this.interval = setInterval(() => {
            if(this.timeLeft > 0)
            {
                this.timeLeft--;
            }
            else
            {
                this.timeLeft = 30;
                this.get_msgs();
            }
        },1000)
    }
    
    pauseTimer() {
        clearInterval(this.interval);
    }
    
    
    msg_list:any = [];
    get_msgs()
    {
        this.db.post_rqst({'data':this.karigar},"offer/get_messeges")
        .subscribe(resp=>{
            console.log(resp);
            this.msg_list = resp['karigar'];
        })
    }
    
    send_msg()
    {
        this.db.post_rqst({"kariger":this.karigar},"offer/send_msg")
        .subscribe(resp=>{
            this.get_msgs();
            this.karigar.messege="";
        })
    }
    
    submit()
    {
        console.log(this.karigar);
        this.loading_list = true;
        
        this.db.post_rqst({ 'data': this.karigar }, 'offer/feedback_reply')
        .subscribe( d => {
            this.loading_list = false;
            console.log(d);
            this.dialog.success( 'Reply has been successfully Send');
            this.dialogRef.close();
        });
    }
    
    formData = new FormData();
    select(event)
    {
        console.log(event);
        this.formData.append("upload",event.target.files[0],event.target.files[0].name);
        this.formData.append("karigar_id",this.karigar.id);
        this.db.fileData(this.formData,"msg_attachment")
        .subscribe(resp=>{
            console.log(resp);
            this.get_msgs();
        })
    }
    
}
