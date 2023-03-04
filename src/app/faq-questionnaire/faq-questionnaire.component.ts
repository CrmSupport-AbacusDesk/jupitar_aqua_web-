import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DatabaseService } from '../_services/DatabaseService';
import { SessionStorage } from '../_services/SessionService';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-faq-questionnaire',
    templateUrl: './faq-questionnaire.component.html',
})
export class FaqQuestionnaireComponent implements OnInit {
    panelOpenState = false;
    toggle:boolean = false;
    
    constructor(public alrt:MatDialog,public db:DatabaseService,public session:SessionStorage,public dialog:DialogComponent) { }
    
    form:any={};
    loginData:any={};
    loading:boolean = false;
    master_search:any=''
    ngOnInit() {
        this.session.getSe()
        .subscribe(resp=>{
            this.loginData = resp;
        })
        
        this.get_questions();
    }
    
    allow:boolean = true;
    save_faq()
    {
        this.loading = true;
        console.log(this.form);
        if(this.allow)
        {
            this.allow = false;
            this.db.post_rqst({data:this.form,"login":this.loginData},"gallary/save_faq")
            .subscribe(resp=>{
                console.log(resp);
                if(resp['msg'] == 'success')
                {  
                    this.toggle = false;
                    this.loading = false;
                    this.dialog.success("Saved Successfully !");
                    this.get_questions();
                    this.allow = true;
                    this.form = {};
                }
            })
        }
    }
    
    question_list:any=[];
    get_questions()
    {
        this.loading = true;
        this.db.post_rqst({"master":this.master_search},"gallary/get_question")
        .subscribe(resp=>{
            console.log(resp);
            this.loading = false;
            this.question_list = resp['question_list'];
        })
    }
    
    edit_question(data)
    {
        this.form = data;
        this.toggle = true;
    }
    
    delete_question(data)
    {
        this.dialog.delete("Are you sure")
        .then(resp=>{
            if(resp)
            {
                this.db.post_rqst({data:data},"gallary/delete_question")
                .subscribe(resp=>{
                    console.log(resp);
                    this.get_questions();
                    this.dialog.success("Successfully Deleted!");
                })
            }
        })
    }
}
