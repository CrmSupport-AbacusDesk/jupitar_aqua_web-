import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
    selector: 'app-bonus-point-model',
    templateUrl: './bonus-point-model.component.html',
    styleUrls: ['./bonus-point-model.component.scss']
})
export class BonusPointModelComponent implements OnInit {
    
    point:any=0;
    karigar_data:any={};
    loading:boolean = false;
    constructor(public db:DatabaseService, @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<BonusPointModelComponent>,public dialog:DialogComponent)
    {
        this.karigar_data = data['karigar'];
    }
    
    ngOnInit() {
    }
    
    assign_points()
    {
        console.log(this.karigar_data);
        console.log(this.point);
        this.loading = true;
        this.db.post_rqst({"point":this.point,"karigar_data":this.karigar_data},"karigar/bonus_points")
        .subscribe(resp=>{
            console.log(resp);
            if(resp['status'] == "SUCCESS")
            {
                this.loading = false;
                this.dialog.success("Points Assigned Successfully!");
                this.dialogRef.close();
            }
        })
    }
}
