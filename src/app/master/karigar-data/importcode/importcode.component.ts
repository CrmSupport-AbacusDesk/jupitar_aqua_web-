import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
    selector: 'app-importcode',
    templateUrl: './importcode.component.html',
    styleUrls: ['./importcode.component.scss']
})
export class ImportcodeComponent implements OnInit {
    
    constructor(public dialogRef: MatDialogRef<ImportcodeComponent>,public dialog: DialogComponent, public alrt:MatDialog,public db:DatabaseService) { }
    upload_url:any='';
    name:any='';
    loading:boolean = false;
    ngOnInit() {
        this.upload_url = this.db.uploadUrl;
    }
    
    formData = new FormData();
    select(event)
    {
        console.log(event);
        this.name = event.target.files[0].name;
        this.formData.append("upload",event.target.files[0],event.target.files[0].name);
    }
    
    allow:boolean = true;
    upload_excel()
    {
        
        this.loading = true;
        this.dialogRef.disableClose = true;
        if(this.allow)
        {
            this.allow = false;
            this.db.fileData(this.formData,"promotional_karigar")
            .subscribe(resp=>{
                console.log(resp);
                this.dialogRef.close();
                this.loading = false;
                if(resp['status'] == 'UPLOAD')
                {
                    this.dialog.success(resp['status']);
                }
                else
                {
                    this.dialog.error(resp['status']);
                }
            })
        }
    }
    
    download()
    {
        window.open(this.upload_url+'demo.csv','_self');
    }
}
