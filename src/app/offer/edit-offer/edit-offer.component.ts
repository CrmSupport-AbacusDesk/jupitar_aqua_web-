import {Component,OnInit} from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.component.html',
})
export class EditOfferComponent implements OnInit {
    
    offer_id;
    loading_list = false;
    addOffer:any={};
    savingData = false;
    mindate:any = new Date();
    englishImage = new FormData();
    hindiImage = new FormData();
    uploadUrl:any="";
    constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
        public dialog: DialogComponent) {
            this.uploadUrl = db.uploadUrl;
            
        }
        
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.offer_id = params['offer_id'];
                console.log(this.offer_id );
                if (this.offer_id) {
                    this.getOfferDetails();
                }
            });
        }
        getData:any = {};
        getOfferDetails() {
            this.loading_list = true;
            this.db.post_rqst(  {'offer_id':this.offer_id}, 'offer/offerEdit')
            .subscribe(d => {
                this.loading_list = false;
                console.log(d);
                this.addOffer = d.offer;
                // this.addOffer.imgId = d.offer;
                // console.log(this.addOffer.imgId);
            });
        }
        
        saveOffer(form:any) {
            this.savingData = true;
            this.addOffer.start_date = this.addOffer.start_date  ? this.db.pickerFormat(this.addOffer.start_date) : '';
            this.addOffer.end_date = this.addOffer.end_date  ? this.db.pickerFormat(this.addOffer.end_date) : '';
            this.addOffer.created_by = this.db.datauser.id;
            this.db.post_rqst( { 'offer' : this.addOffer, 'offer_id' : this.offer_id ,'login_id' :this.db.datauser.id }, 'offer/offerUpdate')
            .subscribe( d => {
                this.savingData = false;
                
                console.log( d );
                
                if(d['status'] == 'EXIST' ){
                    this.dialog.error( 'Offer Code Already exists');
                    return;
                }
                this.router.navigate(['offer-detail/'+ this.offer_id]);
                this.dialog.success( 'Offer successfully Updated');
            });
        }
        
        
        onUploadChange1(evt: any) {
            const file = evt.target.files[0];
            if (file) {
                this.addOffer.imgId = '';
                const reader = new FileReader();
                reader.onload = this.handleReaderLoaded1.bind(this);
                reader.readAsBinaryString(file);
            }
        }
        
        handleReaderLoaded1(e) {
            this.addOffer.imgId = '';
            this.addOffer.offer_banner = 'data:image/png;base64,' + btoa(e.target.result) ;
            console.log(this.addOffer);
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
            this.addOffer.hin_offer_banner = 'data:image/png;base64,' + btoa(e.target.result) ;
            console.log(this.addOffer);
            
        }
        
        
        
    }
    
    