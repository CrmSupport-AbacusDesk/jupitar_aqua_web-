import { Component, OnInit, Renderer2  } from '@angular/core';
import {SessionStorage} from '../_services/SessionService';
import {Router} from '@angular/router';
import {DatabaseService} from './../_services/DatabaseService';
import {DialogComponent} from './../dialog/dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    
    filter : any = {};
    pagelimit:any = 10;
    last_page: number ;
    current_page = 1;
    start:any = 0;
    unreadFeedCount : number = 0;
    pending_redeem_request_retailer : number = 0;
    pending_redeem_request : number = 0;


    constructor(private renderer: Renderer2, private router: Router, public ses: SessionStorage, public db: DatabaseService , public dialog: DialogComponent) { }
    
    ngOnInit() {
        this.get_abacus_con(); 
        this.get_counts();
        this.getUnreadFeedbackCount()       
    }
    
    status:boolean = false;
    toggleHeader() {
        this.status = !this.status;
        if(this.status) {
            this.renderer.addClass(document.body, 'active');
        }
        else {
            this.renderer.removeClass(document.body, 'active');
        }
    }
    
    task_cn:any=0;
    get_abacus_con()
    {
        this.db.post_rqst( {}, 'abacusConnect')
        .subscribe(resp=> {
            console.log(resp);
            this.task_cn = resp.result.task_count;
        });
    }
    logout(): void {
        this.ses.logoutSession();
        this.router.navigate(['/']);
    }
    
    gotoAbacusConnect()
    {
        window.open("http://crmsupport.abacusdesk.com/projecttaskdetail/djBmSjN1bUZQT0hpOXZnZjB5Q2pPUT09","_blank");
    }
    

    get_counts() 
    {
        
        this.db.post_rqst({ }, 'master/getDashboardcounts').subscribe(resp => 
            {
               
                this.pending_redeem_request_retailer=resp.pending_architect_code;
                this.pending_redeem_request = resp.pending_redeem_request;
               
            });
        }

    getUnreadFeedbackCount = () => {
        this.db.post_rqst({'filter': this.filter,'start':this.start,'pagelimit':this.pagelimit },'offer/feedback_list?page=' + this.current_page)
        .subscribe( resp => {
            this.unreadFeedCount =resp.unread_cn;
            
            console.log('Unread Feed Count ->');
            console.log(resp, this.unreadFeedCount);
            console.log('---------------------');
        });
    }

    refershCount = () => {
        this.getUnreadFeedbackCount();
        this.get_counts();
    }


    show_actions:any={};
    
}
