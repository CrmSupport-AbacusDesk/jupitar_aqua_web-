import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DatabaseService } from '../_services/DatabaseService';
import { DialogComponent } from '../dialog/dialog.component';
import { SessionStorage } from '../_services/SessionService';
import { ProductImageModuleComponent } from '../master/product-image-module/product-image-module.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-furniture-sub-idea',
    templateUrl: './furniture-sub-idea.component.html',
})
export class FurnitureSubIdeaComponent implements OnInit {
    
    category_id:any='';
    data:any={};
    savingData:boolean=false;
    image = new FormData();
    loginData:any={};
    toggle:boolean = false;
    upload_url:any=''
    edit_img:boolean=false;
    category:any={};
    loading:boolean = false;
    constructor(public route:ActivatedRoute,public db:DatabaseService,public dialog:DialogComponent,public session:SessionStorage,public router:Router,public alrt:MatDialog) {
        
        this.route.params
        .subscribe(resp=>{
            console.log(resp);
            this.category_id = resp['params'];
            this.get_sub_category();
        })
    }
    
    ngOnInit() {
        this.upload_url = this.db.uploadUrl;
        this.session.getSe()
        .subscribe(resp=>{
            this.loginData = resp;
        })
    }
    
    subcategory_list:any=[];
    get_sub_category()
    {
        this.loading = true;
        this.db.post_rqst({"cat_id":this.category_id},"gallary/get_funiture_sub_cat")
        .subscribe(resp=>{
            console.log(resp);
            this.loading = false;
            this.subcategory_list = resp['subcat_list'];
            this.category = resp['category'];
        })
    }
    
    cat_image:any=[];
    select(event)
    {
        this.edit_img = false;   
        for(var i=0;i<event.target.files.length;i++)
        {     
            let files = event.target.files[i];
            if (files) 
            {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.cat_image.push({"image_name":e.target.result});
                }
                reader.readAsDataURL(files);
            }
            this.image.append("image_"+i,event.target.files[i],event.target.files[i].name);
        }
    }
    
    saveSubcategory()
    {
        if(this.cat_image.length == 0)
        {
            this.dialog.warning("Pleas Select Image");
            return;
        }
        this.image.append("category_id",this.category_id);
        
        this.db.fileData(this.image,"furniture_subideas")
        .subscribe(resp=>{
            console.log(resp);
            this.dialog.success("Successfull saved !");
            this.toggle = false;
            this.get_sub_category();
        });
    }
    
    delete_item(data)
    {
        this.dialog.delete("Are You Sure")
        .then(resp=>{
            console.log(resp);
            if(resp)
            {
                this.db.post_rqst({data:data},"gallary/delete_suncategory")
                .subscribe(resp=>{
                    console.log(resp);
                    this.dialog.success("Deleted Successfully");
                    this.get_sub_category();
                });
            }
        })
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
