import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';
import { DialogComponent } from '../dialog/dialog.component';
import { SessionStorage } from '../_services/SessionService';
import { Router } from '@angular/router';
import { ProductImageModuleComponent } from '../master/product-image-module/product-image-module.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-furniture-idea',
    templateUrl: './furniture-idea.component.html',
})
export class FurnitureIdeaComponent implements OnInit {
    
    data:any={};
    savingData:boolean=false;
    image = new FormData();
    loginData:any={};
    toggle:boolean = false;
    upload_url:any=''
    edit_img:boolean=false;
    loading:any=false;
    constructor(public db:DatabaseService,public dialog:DialogComponent,public session:SessionStorage,public router:Router,public alrt:MatDialog) { }
    
    ngOnInit() {
        this.upload_url = this.db.uploadUrl;
        this.get_category();
        this.session.getSe()
        .subscribe(resp=>{
            this.loginData = resp;
        })
    }
    
    category_list:any=[];
    get_category()
    {
        this.loading = true;
        this.db.post_rqst({},"gallary/get_funiture_ideas")
        .subscribe(resp=>{
            this.loading = false;
            console.log(resp);
            this.category_list = resp['category_list'];
        })
    }
    
    cat_image:any=[];
    select(event)
    {
        this.edit_img = false;        
        let files = event.target.files[0];
        if (files) 
        {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.cat_image = e.target.result;
            }
            reader.readAsDataURL(files);
        }
        this.image.append("image",event.target.files[0],event.target.files[0].name);
    }
    
    saveCategory()
    {               
        if(this.cat_image.length == 0)
        {
            this.dialog.warning("Pleas Select Image");
            return;
        }

        if(this.exist)
        {
            this.dialog.error("Category Already Exist");
            return;
        }
        
        this.db.post_rqst({data:this.data,loginData:this.loginData},"gallary/save_ideas")
        .subscribe(resp=>{
            console.log(resp);
            if(resp['msg'] == "success")
            {
                this.image.append("id",resp['inserted_id']);
                this.db.fileData(this.image,"furniture_ideas")
                .subscribe(resp=>{
                    console.log(resp);
                    this.dialog.success("Successfull saved !");
                    this.toggle = false;
                    this.get_category();
                });
            }
        })
    }

    exist:boolean=false;
    check_cat()
    {
        console.log(this.data.category_name.length);
        if(this.data.category_name.length > 3)
        {
            this.db.post_rqst({'category':this.data.category_name},"gallary/check_category")
            .subscribe(resp=>{
                console.log(resp);
                this.exist = resp['exist'];
            })
        }
    }
    
    delete_item(data)
    {
        this.dialog.delete("Are You Sure")
        .then(resp=>{
            console.log(resp);
            if(resp)
            {
                this.db.post_rqst({data:data},"gallary/delete_category")
                .subscribe(resp=>{
                    console.log(resp);
                    this.dialog.success("Deleted Successfully");
                    this.get_category();
                });
            }
        })
    }
    
    edit_item(data)
    {
        console.log(data);
        this.edit_img = true;
        this.data.category_name = data.category;
        this.data.id = data.id;
        this.cat_image = data.image_name;
        this.toggle = true;
    }
    
    gotoDetail(category_id)
    {
        this.router.navigate(['furniture-detail/'+category_id])
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
}
