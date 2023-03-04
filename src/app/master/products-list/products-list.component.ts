import {Component,OnInit , Input} from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import { ProductImageModuleComponent } from '../product-image-module/product-image-module.component';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { MatDialog, MatDatepicker } from '@angular/material';

import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';
import { AssignRelatedProductsComponent } from '../assign-related-products/assign-related-products.component';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
    
    loading: any;
    source: any = '';
    loading_page = false;
    loading_list = false;
    loader: any = false;
    locations: any = [];
    products:any = [];
    total_products:any = 0;
    last_page: number ;
    current_page = 1;
    search: any = '';
    searchData = true;
    isInvoiceDataExist = false;
    filter:any = {};
    filtering : any = false;
    savingData = false;
    productForm: any = {};
    image = new FormData();
    uploadurl:any='';
    addImageIcon=true;
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent, public alrt:MatDialog ) {}
    
    ngOnInit() {
        this.getProductList('');
        this.getCategory();
        this.productForm.image=[];
        this.category.profile_selected = 0;
        this.uploadurl = this.db.uploadUrl;
    }
    
    openDatePicker(picker : MatDatepicker<Date>)
    {
        picker.open();
    }
    
    redirect_previous() {
        this.current_page--;
        this.getProductList('');
    }
    redirect_next() {
        if (this.current_page < this.last_page) { this.current_page++; }
        else { this.current_page = 1; }
        this.getProductList('');
    }
    
    getProductList(action) 
    {
        this.loading_list = true;
        this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
        if( this.filter.date || this.filter.location_id )this.filtering = true;
        this.filter.mode = 0;
        
        if(action=='refresh')
        {
            this.filter={};
        }
        console.log(this.filter);
        
        this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'master/productList?page=' + this.current_page )
        .subscribe( d => {
            console.log(d);
            this.loading_list = false;
            this.current_page = d.products.current_page;
            this.last_page = d.products.last_page;
            this.total_products =d.products.total;
            this.products = d.products.data;
            // this.selected_image=d.products.image;
            this.productForm =  this.products;
            
            for(let i=0;i<this.products.length;i++)
            {
                if(this.products[i].status=="Active")
                {
                    this.products[i].newsStatus=true;
                }
                else if(this.products[i].status=="Deactive")
                {
                    this.products[i].newsStatus=false;
                }
            }
            
            console.log( this.products );
        });
    }
    
    category:any=[];
    getCategory()
    {
        this.db.post_rqst(  '', 'master/categoryForProduct')
        .subscribe(d => {
            console.log(d);
            this.category = d.category;
            console.log(this.category);
        });
    }
    
    catdata:any='';
    editProduct(id,index){
        this.addImageIcon=true;
        this.productForm = this.products.filter( x => x.id==id)[0];
        this.productForm.profile_selected = parseInt(this.productForm.profile);
        console.log(this.productForm);
        // if(this.productForm.new_arrival==1){
        //     this.productForm.new_arrival.check;
        // }
        this.selected_image=[];
        this.productForm.category_id=this.productForm.master_category_id;
        this.productForm.profile_selected = 0;
        
        for(let i=0; i<this.productForm.image.length ;i++)
        {
            if( parseInt( this.productForm.image[i].profile ) == 1  )
            this.productForm.profile_selected = this.productForm.image[i].id;
            this.selected_image.push({"image":this.productForm.image[i].image_name,"id":this.productForm.image[i].id} );
        }
    }
    toggle:any;
    saveProduct()
    {
        this.savingData = true;
        
        if(this.products.id){
            this.productForm.edit_product_id = this.products.id;
        }
        this.productForm.image= this.selected_image ? this.selected_image : []
        this.productForm.created_by = this.db.datauser.id;
        console.log(this.new_arrival);
        
        this.productForm.new_arrival=this.new_arrival;
        this.db.post_rqst( { 'product' : this.productForm }, 'master/addProduct')
        .subscribe( d => {
            console.log( d );
            if(d['status'] == 'EXIST' )
            {
                this.savingData = false;
                this.dialog.error('This Product Size Already exists');
                return;
            }
            
            if(this.image)
            {
                this.image.append("created_by",this.db.datauser.id);
                this.image.append("product_id",d.product_id);
                
                this.db.fileData(this.image,"productImage")
                .subscribe(resp=>{
                    console.log(resp);
                    this.savingData = false;
                    this.image = new FormData();
                    this.productForm = {};
                    this.toggle = "false"
                    this.selected_image=[];
                    this.router.navigate(['products-list']);
                    this.dialog.success('Product successfully save');
                    this.getProductList('');
                })
            }
            
        });
    }
    
    
    selected_image :any = [];
    onUploadChange(data: any)
    {
        for(let i=0;i<data.target.files.length;i++)
        {
            let files = data.target.files[i];
            if (files) 
            {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selected_image.push({"image":e.target.result});
                    if(this.selected_image.length==0){
                        this.addImageIcon=true;
                    }
                    else{
                        this.addImageIcon=false;
                    }
                }
                reader.readAsDataURL(files);
            }
            this.image.append(""+i,data.target.files[i],data.target.files[i].name);
        }
    }
    
    deleteProductImage(index,data)
    {
        this.dialog.delete("Are you sure ?")
        .then(resp=>{
            console.log(resp);
            if(resp)
            {
                if(data.id){
                    this.db.post_rqst({"data":data},"master/delete_prod_image")
                    .subscribe(resp=>{
                        console.log(resp);
                        this.dialog.success("Deleted!");
                        this.selected_image.splice(index,1);
                        if(this.selected_image.length==0)
                        {
                            this.addImageIcon=true;
                            console.log("truee");
                        }
                        else{
                            this.addImageIcon=false;
                        }
                    });
                }
                else{
                    this.dialog.success("Deleted!");
                    this.selected_image.splice(index,1);
                    if(this.selected_image.length==0)
                    {
                        this.addImageIcon=true;
                        console.log("truee");
                    }
                    else{
                        this.addImageIcon=false;
                    }
                }
            }
        })
    }
    
    active:any='';
    ProductProfile(index,img_id)
    {
        this.active=index;
        this.productForm.profile_selected=img_id;
    }
    
    addProduct()
    {
        this.selected_image=[];
        this.productForm={};
        this.addImageIcon=true;
    }
    removeImage()
    {
        this.selected_image=[];
    }
    
    deleteProduct(id, product_id) {
        console.log('====================================');
        console.log(id, product_id);
        console.log('====================================');
        this.dialog.delete('Product').then((result) => {
            if(result) {
                this.db.post_rqst({product_id : product_id, id:id}, 'master/productDelete')
                .subscribe(d => {
                    console.log(d);
                    this.getProductList('');
                    this.dialog.successfully();
                });
            }
        });
    } 
    
    updateStatus(i,event)
    {
        console.log(event);
        console.log(event.checked);
        if(event.checked == false)
        {
            const dialogRef = this.alrt.open(DeactiveStatusComponent,{
                width: '500px',
                // height:'500px',
                
                data: {
                    'id' :this.products[i].id,
                    'type':'product',
                    'checked' : event.checked,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
                if( result ){
                    this.getProductList('');
                }
                this.getProductList('');
            });
        }
        else if(event.checked == true)
        {
            this.db.post_rqst({'checked' : event.checked, 'id' : this.products[i].id,'login_id':this.db.datauser.id}, 'master/productStatus')
            .subscribe(d => {
                console.log(d);
                this.dialog.success( 'Status Change successfully ');
                this.getProductList('');
            });
        }
    }
    
    openDialog(id ,string )
    {
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
    
    exportproductList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'master/exportproductList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'app/uploads/exports/productList.csv';
            console.log(d);
        });
    }

    new_arrival;
    newArrival(e){
        console.log(e.checked);
        if(e.checked==true){
            this.new_arrival=1;
        }
        else{
            this.new_arrival=0;
        }
    }

    assign_arr:any=[]
    unassign_arr:any=[]
    select_product(event,indx)
    {        
        console.log(event+" "+indx);
        if(event.checked)
        {
            this.assign_arr.push(this.products[indx]);
            let idx = this.unassign_arr.findIndex(row => row.id == this.products[indx].id);
            this.unassign_arr.splice(idx,1);
        }
        else
        {
            let idx = this.assign_arr.findIndex(row => row.id == this.products[indx].id);
            this.assign_arr.splice(idx,1);
            this.unassign_arr.push(this.products[indx]);
        }
        console.log(this.assign_arr);
        console.log(this.unassign_arr);
    }
    assign_related_product(user):void{
        const dialogRef = this.alrt.open(AssignRelatedProductsComponent, {
            width: '500px',
            data:{
                assign_arr:this.assign_arr,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.getProductList('');
        });
    }
}
