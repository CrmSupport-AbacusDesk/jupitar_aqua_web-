import {Component,OnInit} from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { ImportStatusModelComponent } from '../../offer/import-status-model/import-status-model.component';
import {MatDialog} from '@angular/material';
import { ProductImageModuleComponent } from 'src/app/master/product-image-module/product-image-module.component';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
})
export class AddOfferComponent implements OnInit {

  loading_list = false;
  addOffer: any = {};
  addArea: any = {};
  addGift: any = {};
  savingData = false;
  states: any = [];
  districts: any = [];
  cities: any = [];
  pincodes: any = [];
  offer_id: any = 0;
  mindate:any = new Date();
  giftList:any = [];
  gift :any = {};
  uploadUrl:any ='';
  btn_value = false;
  filter: string;

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent ,  public alrt:MatDialog) {
      this.uploadUrl = db.uploadUrl;
    }

  ngOnInit() {
    this.offer_id = 0;
    this.getStateList();
    this.getGiftList();
}

checkValue(){
  this.btn_value = true
}

  getStateList(){
    this.loading_list = false;
    this.db.get_rqst('', 'app_master/getStates')
    .subscribe( d => {  
      this.loading_list = true;  
      console.log( d );
      this.states = d.states;
    });
  }
  allState(){
    if( !this.addOffer.allStates ){
          for (let i = 0; i < this.states.length; i++) {
            this.states[i].selected = false;
            }
    }else{
        for (let i = 0; i < this.states.length; i++) {
              this.states[i].selected = true;
        }
     }
    this.getDistrictList();
  }

  getDistrictList(){
    this.loading_list = false;
    this.db.post_rqst( { 'state': this.states }, 'master/getMultipleDistrict')
    .subscribe(d => {  
      this.loading_list = true;
      this.districts = d.state;
    });
  }

  // selectedDistrrictCount :any = 0;
  // districtChange(i,x){
  //   if(  this.districts[i].districts[x].selected  )this.selectedDistrrictCount++;
  //   if(  !this.districts[i].districts[x].selected  )this.selectedDistrrictCount--;
  //   console.log( this.selectedDistrrictCount );
    
  // }

  allDistrict(){

            if( !this.addOffer.allDistrict ){
                for (let i = 0; i < this.districts.length; i++) {
                    this.districts[i].stateWiseDistrict = false;
                    if(this.districts[i].selected){
                        for (let x = 0; x < this.districts[i].districts.length; x++) {
                            this.districts[i].districts[x].selected = false;
                            // this.selectedDistrrictCount++;
                            this.addOffer.allDistrict =  this.districts[i].districts[x].selected;
                        }
                    }
                }
            }else{
                for (let i = 0; i < this.districts.length; i++) {
                    this.districts[i].stateWiseDistrict = true;

                    if(this.districts[i].selected){
                        for (let x = 0; x < this.districts[i].districts.length; x++) {
                          // this.selectedDistrrictCount--;
                          this.districts[i].districts[x].selected = true;
                        }
                    }
                }
            }
            // console.log( this.selectedDistrrictCount );

        }
        
        
        allStateWiseDistrict(index){

                for (let x = 0; x < this.districts[ index ].districts.length; x++) {
                    if( this.districts[ index ].stateWiseDistrict == true ){
                        // this.selectedDistrrictCount++;
                        this.districts[ index ].districts[x].selected = true;
                    }else{
                        // this.selectedDistrrictCount--;
                        this.districts[ index ].districts[x].selected = false;
                    }
                }

            console.log( this.districts );
           
        }
  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  openDialog(img) {
    const dialogRef = this.alrt.open(ProductImageModuleComponent,
        {
            data: {
                'img' : img,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

  
  saveOffer(form:any) {
    if( !this.addOffer.offer_banner ){
      this.dialog.warning('Please Upload Offer Banner Image');
      return;
    }
    // this.giftList=this.addGift.gifting;
    this.savingData = true;
  this.addOffer.start_date = this.addOffer.start_date  ? this.db.pickerFormat(this.addOffer.start_date) : '';
  this.addOffer.end_date = this.addOffer.end_date  ? this.db.pickerFormat(this.addOffer.end_date) : '';
  this.addOffer.created_by = this.db.datauser.id;
  this.addOffer.karigar_edit_id = this.offer_id;

// this.addOffer.user_type = 'Retailer';

    this.db.insert_rqst( { 'offer' : this.addOffer, 'area' : this.districts, 'gift' : this.giftList , 'login_id' :this.db.datauser.id }, 'offer/add')
    .subscribe( d => {
      this.savingData = false;
      console.log( d );
      if(d['status'] == 'EXIST' ){
        this.dialog.error( 'Offer Code Already exists');
        return;
      }
       
      if( !this.choose_excel ){
          this.dialog.success( 'Offer successfully save');
          this.router.navigate(['offer-list']);
          return;
      }
      this.offer_id = d['id'];
      this.uploadCoupon( d['id'] );
    });
  }

  choose_excel = 0;
  onUploadChange1(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded1(e) {
    this.addOffer.offer_banner = 'data:image/png;base64,' + btoa(e.target.result) ;
  }

  onUploadChange2(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded2(e) {
    this.gift.image = 'data:image/png;base64,' + btoa(e.target.result) ;
    console.log( this.addOffer.image );
  }
  

  addgiftList()
  {
    for (let i = 0; i < this.giftList.length; i++) {
      if( this.gift.gift_title ===  this.giftList[i].gift_title ){
            this.dialog.success('Part Number Already Exist, Please Delete it first.');
            return;
      }
    }
    console.log(this.gift);
    
    this.giftList.push( this.gift );
    console.log(this.giftList);
    this.gift={};
    this.btn_value = false
  }


  RemoveItem(i)
  {
      console.log(i);
            this.giftList.splice(i,1);
            this.dialog.success('Item has been deleted.');
    }

    
giftlisting:any=[];
      getGiftList() 
      {
      this.filter='';
          this.db.post_rqst(  { 'filter':this.filter}, 'offer/dropDownGift')
          .subscribe((d)=> {
              this.loading_list = false;
              console.log(d);
              this.giftlisting = d.gift;
          });
      }
                
      coupon_ex:any = '';
      file:any = {};
      onUploadChange(evt: any) {

        this.file = evt.target.files[0];
      this.choose_excel = 1;
        console.log(this.file);
      }

      formData = new FormData();
      exist_coupon:any=[];
      uploadCoupon( f ){
        if( !this.choose_excel ){
          this.dialog.warning('Please choose file!');
          return;
        }
        this.loading_list = true; 
        this.formData.append('coupon', this.file, this.file.name);
        
        this.formData.append('offer_id', this.offer_id);
        
        this.db.fileData( this.formData, 'app_master/couponExcel')
        .subscribe(d => {  
        this.loading_list = false;
        this.formData = new FormData();
        if(d['status'] == 'BLANK'){
          this.dialog.warning('File is Blank');
          return;
        }
        
        if(d['status'] == 'INCORRECT FILE'){
          this.dialog.warning('File Data is incorrect');
          return;
        }

        
        if(d['status'] == 'INCORRECT FORMAT'){
          this.dialog.warning('File Format is incorrect! only CSV Support');
          return;
        }

        if(d['status'] == 'SIZE SHORT'){
          this.dialog.warning('CSV File To Sort ');
          return;
        }
        
        if(d['status'] == 'UPLOAD' ){
         

          if( d['exist_coupon'].length > 0 )
          {
              const dialogRef = this.alrt.open(ImportStatusModelComponent,
                {
                  width: '650px',
                  height:'500px',
                  data: {
                    'exist_coupon' : d['exist_coupon'],
                  }
                });
                dialogRef.afterClosed().subscribe(result => {
                  console.log(`Dialog result: ${result}`);
                });

          if(d['upload_count'] > 0   ){

        
            }else{
                this.dialog.warning(d['exist_coupon'].length+' Coupon Already Exist!');
                return;

            }
            return;
              }

          if(d['upload_count'] > 0   ){
            this.dialog.success(d['upload_count']+' Coupon Upload Successfully!');

          }

        }
             
          this.router.navigate(['offer-list']);
          this.dialog.success( 'Offer successfully save');
       
        },err => {console.log(err);  this.formData = new FormData(); this.loading_list = false; });
        
        
      }


}
