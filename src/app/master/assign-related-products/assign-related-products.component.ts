import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-assign-related-products',
  templateUrl: './assign-related-products.component.html',
  styleUrls: ['./assign-related-products.component.scss']
})
export class AssignRelatedProductsComponent implements OnInit {
  
  data;
  assign_array:any=[];
  constructor(public router:ActivatedRoute,public dialog: DialogComponent, public alrt:MatDialog,
    public dialogRef: MatDialogRef<AssignRelatedProductsComponent>,
    public db:DatabaseService,@Inject(MAT_DIALOG_DATA) data) 
  {
    // console.log(data);
    // console.log(data['assign_arr']);
    for(let i=0;i<data['assign_arr'].length;i++){
      // console.log(data['assign_arr'][i].id);
      // console.log(data['assign_arr'][i].product_name);
      // console.log(data['assign_arr'][i].product_code);
      this.assign_array.push({'id':data['assign_arr'][i].id,'product_name':data["assign_arr"][i].product_name,'product_code':data["assign_arr"][i].product_code});
      // this.assign_array.push(data["assign_arr"][i].product_code);
      console.log(this.assign_array);
      
      
    }    
    this.data=data;
  }

  ngOnInit() {
    this.getProductList('');
  }

  products;
  getProductList(e){
    console.log("you search : "+e);
    
    this.db.post_rqst({'search':e}, 'app_master/drop_down_product')
        .subscribe( d => {
            // console.log(d);
            this.products=d['products'];
            console.log(this.products);
            
          })
  }
  filterMyOptions(e){
    console.log(e);
  }
  dropdown_product_code;
  selectRelatedProducts(e){
    console.log(e);
    this.dropdown_product_code=e;
  }
  saveRelatedProducts(){
    console.log("save btn click");
    console.log(this.dropdown_product_code);
    console.log(this.data);
    this.db.post_rqst({'p_code':this.dropdown_product_code,'assigned_product_code':this.assign_array},
      'app_master/save_assigned_product').subscribe(e=>{
      console.log(e);
      this.dialog.success("Product is Successfully Assigned !");
      this.dialogRef.close();
    })

  }

}
