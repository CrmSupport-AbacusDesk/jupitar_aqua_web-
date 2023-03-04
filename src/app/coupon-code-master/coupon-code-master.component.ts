import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { SessionStorage } from 'src/app/_services/SessionService';

@Component({
  selector: 'app-coupon-code-master',
  templateUrl: './coupon-code-master.component.html',
  styleUrls: ['./coupon-code-master.component.scss']
})
export class CouponCodeMasterComponent implements OnInit {

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
    mainCategory:any=[];
    sr_no:any=0;
    redeem_asc=false;
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,public dialog: DialogComponent, public alrt:MatDialog ) {}
    
    ngOnInit() {
        this.getProductList('');
        this.productForm.image=[];
        this.mainCategory.profile_selected = 0;
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
    
    currentPage = () => {
        if(this.current_page < 1){
            this.current_page = 1;
        }else if (this.current_page > this.last_page) 
        { 
            this.current_page = this.last_page;
        }
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
        
        this.db.post_rqst({'filter': this.filter , 'login':this.db.datauser}, 'master/productPointsList?page=' + this.current_page )
        .subscribe( d => {
            console.log(d);
            this.loading_list = false;
            this.current_page = d.product_point.current_page;
            this.last_page = d.product_point.last_page;
            this.total_products =d.product_point.total;
            this.products = d.product_point.data;
            this.sr_no = this.current_page - 1;
            this.sr_no = this.sr_no * d.product_point.per_page;    
            // this.productForm =  this.products;
        });
    }

    catdata:any='';
    isEditCalled = false;
    editProduct(id,index){
        this.isEditCalled = true;
        this.addImageIcon=true;
        this.productForm = this.products.filter( x => x.id==id)[0];
        this.productForm.profile_selected = parseInt(this.productForm.profile);
        console.log(this.productForm);
        this.productForm.profile_selected = 0;
        
    }
    toggle:any;
    saveProduct()
    {
        this.savingData = true;
        this.productForm.last_updated_by = this.db.datauser.id;
        this.db.post_rqst( this.productForm, 'master/updateProductPoints')
        .subscribe( d => {
            if(d.status == 'PRODUCTEXIST' || d.status == 'GROUPEXIST'){
                this.dialog.error('Brand Name already exists.');
                this.savingData = false;
                this.getProductList('');
                return;
            }
            console.log( d );
            this.savingData = false;
            this.productForm = {};
            this.toggle = "false";
            this.router.navigate(['coupon-code-master']);
            this.dialog.success('Product successfully save');
            this.getProductList('');
            
        });
    }
    
    

    
    active:any='';
    ProductProfile(index,img_id)
    {
        this.active=index;
        this.productForm.profile_selected=img_id;
    }
    
    addProduct()
    {
        this.isEditCalled = false;
        this.productForm={};
        this.addImageIcon=true;
    }

    deleteProduct(id, product_id) {
        console.log("====================================");
        console.log(id, product_id);
        console.log("====================================");
        this.dialog.delete("Product").then((result) => {
          if (result) {
            this.db
              .post_rqst({ product_id: product_id, id: id }, "master/productgroupDelete")
              .subscribe((d) => {
                console.log(d);
                this.getProductList("");
                this.dialog.successfully();
              });
          }
        });
      }


    exportproductList()
    {
        this.filter.mode = 1;
        this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser}, 'master/exportProductPointsList')
        .subscribe( d => {
            this.loading_list = false;
            document.location.href = this.db.myurl+'app/uploads/exports/ProductPoints.csv';
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

    copyDealerPoint = (e) => {
        console.log(e.checked);

        if(e.checked == true){
            this.productForm.painter_point = this.productForm.dealer_point 
        }
        else {
            this.productForm.painter_point = ''; 
        }

    }
    
    sortByPoints = () => {
        this.redeem_asc = !this.redeem_asc;
        if(this.redeem_asc){
            this.filter.sortBy = {
                "sorting_column": "karigar_point",
                "sorting_order": "asc"
            }
            this.getProductList('');
        }
        else if (!this.redeem_asc){
            this.filter.sortBy = {
                "sorting_column":"karigar_point",
                "sorting_order": "desc"
            }
            this.getProductList('');
        }
      }
    
}

