import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';
import { SessionStorage } from '../_services/SessionService';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductImageModuleComponent } from '../master/product-image-module/product-image-module.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-site-gallery',
    templateUrl: './site-gallery.component.html',
    styleUrls: ['./site-gallery.component.scss']
})
export class SiteGalleryComponent implements OnInit {
    
    constructor(public db:DatabaseService,public session:SessionStorage,public dialog:DialogComponent,public alrt:MatDialog) { }
    
    toggle:boolean = false;
    boxlist:any=[];
    upload_url:any='';
    loginData:any={};
    loading:boolean = false;
    imageData:any={};
    savingData:boolean = false;
    ngOnInit() {
        this.upload_url = this.db.uploadUrl;
        this.session.getSe()
        .subscribe(resp=>{
            console.log(resp);
            this.loginData = resp
        })
        this.get_pics();
    }
    
    select_all:boolean = false;
    active: any;
    karigar_list:any = [];
    start:any=0;
    limit:any=12;
    get_pics()
    {
        this.loading = true;
        this.db.post_rqst({"data":this.loginData,"start":this.start,"limit":this.limit},"gallary/get_site_pics")
        .subscribe(resp=>{
            this.loading = false;
            this.karigar_list = resp['karigars'];
            this.karigar_list.map(resp=>{
                resp.checked = false;
                resp.working_pics.map(data=>{
                    data.checked = false;
                })
            });
            console.log(this.karigar_list);
        })
    }
    
    loadMore(kariger_id,index)
    {        
        this.db.post_rqst({"karigar_id":kariger_id,"start":this.karigar_list[index]['working_pics'].length,"limit":this.limit},"gallary/load_more_image")
        .subscribe(resp=>{
            console.log(resp['images']);
            resp['images'].forEach(element => {
                this.karigar_list[index]['working_pics'].push(element);
            });
            console.log(this.karigar_list[index]['working_pics']);
        })
    }
    
    deselect()
    {
        console.log("called");
        
        this.delete_array = [];
        this.karigar_list.map(resp=>{
            resp.checked = false;
            resp.working_pics.map(data=>{
                data.checked = false;
            })
        });
    }
    
    delete_array:any = [];
    check_item(index,index2)
    {
        if(this.karigar_list[index].working_pics[index2].checked)
        {
            this.delete_array.push(this.karigar_list[index].working_pics[index2]);
        }
        else
        {
            let arr_indx = this.delete_array.findIndex(row=>row.id == this.karigar_list[index].working_pics[index2].id)
            this.delete_array.splice(arr_indx,1);
        }
        
        console.log(this.delete_array);
    }
    
    download(data)
    {
        window.open(data,"_blank");
    }
    
    delete_selected(data,index)
    {
        console.log(data);
        console.log(index);
        console.log(this.delete_array);
        
        this.dialog.delete('Karigar')
        .then((result) => {
            if(result) {
                this.db.post_rqst({data:data},"gallary/delete_pics")
                .subscribe(resp=>{
                    console.log(resp);
                    this.dialog.success("Successfull Deleted!")
                    this.get_pics();
                })
            }
        });
    }
    
    openDialog(id ,string ) {
        const dialogRef = this.alrt.open(ProductImageModuleComponent,{
            data: {
                'id' : id,
                'mode' : string,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
    
    editImage(data,idx)
    {
        console.log(data);
        console.log(data,idx);
        this.imageData = data;
    }
    
    save_details(form)
    {
        console.log(form);
        console.log(this.imageData);
        this.savingData = true;
        this.db.post_rqst({data:this.imageData},"gallary/edit_site_pic")
        .subscribe(resp=>{
            console.log(resp);
            this.dialog.success("Successfull Updated!")
            this.savingData = false;
            this.imageData = {};
            this.toggle = false;
            this.get_pics();
        })
    }
}
