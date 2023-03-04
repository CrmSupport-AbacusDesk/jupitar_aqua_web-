import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from '../_services/DatabaseService';
import { Params } from '@angular/router';

@Component({
    selector: 'app-mastet-date-filter-model',
    templateUrl: './mastet-date-filter-model.component.html',
    styleUrls: ['./mastet-date-filter-model.component.scss']
})
export class MastetDateFilterModelComponent implements OnInit {
    
    constructor(private dialogRef: MatDialogRef<MastetDateFilterModelComponent>,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) public params: any) {
        console.log(this.params);
        this.data.from = this.params.from;
        this.data.to = this.params.to;
    }
    
    data:any={};
    today:any = '';
    ngOnInit() {
        this.today = new Date();
    }
    
    submit()
    {
        console.log(this.data);
        this.data.from = this.data.from  ? this.db.pickerFormat(this.data.from) : '';
        this.data.to = this.data.to  ? this.db.pickerFormat(this.data.to) : '';
        this.dialogRef.close(this.data);
    }
}
