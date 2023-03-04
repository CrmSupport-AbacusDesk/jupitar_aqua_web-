import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../_services/DatabaseService';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialog, MatDatepicker } from '@angular/material';
import { FeedbackReplyModleComponent } from '../feedback-reply-modle/feedback-reply-modle.component';
import { MastetDateFilterModelComponent } from '../mastet-date-filter-model/mastet-date-filter-model.component';


@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
    
    loading_list = false;
    feedback: any = [];
    total_feedback = 0;
    all_feedback = 0;
    read_feedback = 0;
    unread_feedback = 0;
    start:any = 0;
    pagelimit:any = 10;
    last_page: number ;
    current_page = 1;
    search: any = '';
    filter:any = {};
    filtering : any = false;
    pagenumber:any='';
    total_page:any='';
    constructor(public db: DatabaseService, public dialog: DialogComponent, public alrt:MatDialog ) {}
    
    ngOnInit()
    {
        this.filter.msg_status = 'Unread';
        this.getFeedbackList(this.pagelimit,this.start,''); 
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    
    redirect_previous() {
        this.current_page--;
        this.getFeedbackList(this.pagelimit,this.start,'');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getFeedbackList(this.pagelimit,this.start,'');
    }
    
    current1()
    {
        this.current_page = 1;
        this.getFeedbackList(this.pagelimit,this.start,'');
    }
    last1()
    {
        this.current_page = this.last_page;
        this.getFeedbackList(this.pagelimit,this.start,'');
    }
    getFeedbackList(pagelimit:any=50,start:any=0,action) 
    {
        this.loading_list = true;
        this.filtering = false;
        this.pagelimit = pagelimit;
        this.start = start;
        if(action=='refresh')
        {
            this.filter={};
            this.filter.msg_status = 'Unread';
            this.current_page=1;
        }
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        if( this.filter.date || this.filter.search || this.filter.first_name || this.filter.mobile_no)this.filtering = true;
        
        this.db.post_rqst({'filter': this.filter,'start':this.start,'pagelimit':this.pagelimit },'offer/feedback_list?page=' + this.current_page)
        .subscribe( resp => {
            this.loading_list = false;
            console.log(resp);
            this.feedback = resp.feedback;
            this.total_feedback =resp.feedback_cn;
            this.all_feedback =resp.all_cn;
            this.read_feedback =resp.read_cn;
            this.unread_feedback =resp.unread_cn;
            
            this.total_page = Math.ceil(this.total_feedback/this.pagelimit);
            this.pagenumber = (this.start/this.pagelimit)+1;
        });
    }
    
    truncate() 
    {
        this.db.post_rqst(  '', 'karigar/truncate')
        .subscribe( d => {
        });
    }
    
    reply(id)
    {
        console.log(id);
        const dialogRef = this.alrt.open(FeedbackReplyModleComponent,{
            width: '500px',
            data: {
                'id' : id
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.getFeedbackList(this.pagelimit,this.start,'');
        });
    }
    
    openDatepicker(): void {
        const dialogRef = this.alrt.open(MastetDateFilterModelComponent, {
            width: '500px',
            data: {
                from:this.filter.date_from,
                to:this.filter.date_to
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.filter.date_from = result.from;
            this.filter.date_to = result.to;
            this.getFeedbackList(this.pagelimit,this.start,'');
        });
    }
}

