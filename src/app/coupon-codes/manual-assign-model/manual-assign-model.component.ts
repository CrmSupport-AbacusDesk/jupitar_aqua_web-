import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-manual-assign-model',
    templateUrl: './manual-assign-model.component.html',
})
export class ManualAssignModelComponent implements OnInit {
    
    id:any;
    type:any;
    form:any={};
    
    constructor(public db: DatabaseService,  public dialog: DialogComponent,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ManualAssignModelComponent>) {
        console.log(data);
        this.form.coupon_id=data.id;
    }
    
    ngOnInit() {
    }
    
    submit()
    {
        console.log(this.form);
        
        this.db.post_rqst({'coupon_id': this.form.coupon_id,'karigar_id':this.form.karigar_id},'gallary/assign_manually')
        .subscribe(d => {
            console.log(d);
            this.dialog.success('Coupon successfully Assigned');
            this.dialogRef.close(true);
        });
    }
    
    karigar_list:any=[]
    search_karigar()
    {
        if(this.form.karigar_name.length > 3)
        {
            this.db.post_rqst({"name":this.form.karigar_name},"offer/get_kariger")
            .subscribe(resp=>{
                console.log(resp);
                this.karigar_list = resp['karigar'];
            })
        }
    }

    set_id(data)
    {
        this.form.karigar_id = data.id;
    }
}

