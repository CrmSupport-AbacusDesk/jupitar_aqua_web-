import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    
    loading_list = false;
    balance_coupon_value:any;
    karigars:any;
    totalNetwork:any;
    user_karigar:any;
    user_Retailer:any;
    user_Distributor:any;
    unread_counts:any;
    offer:any;
    total_coupon_value:any;
    coupon_value_scan_by_Retailer:any;
    coupon_value_scan_by_karigar:any;
    offer_karigar:any;
    offer_Retailer:any;
    pending_redeem_request:any;
    pending_redeem_request_karigar:any;
    pending_redeem_request_retailer:any;
    offer_gift:any;
    products:any;
    super_karigars:any=[];
    super_dealers:any=[];
    offer_balance_days:any=[];
    state_wise_karigars:any=[];
    dataSource : any = [];
    dataSource1:any=[];
    scan_coupon_count:any=[];
    coupon_count:any=[];
    data_Source:any;
    karigar_Source:any;
    dealer_Source:any;
    distributor_Source:any;
    karigar_state_wise:any=[];
    dealer_state_wise:any=[];
    distributor_state_wise:any=[];
    stateWiseKarigar:any=[];
    stateWiseDealer:any=[];
    stateWiseDistributor:any=[];
    total_coupon_amount: any;
    pending_couopn_amount: any;
    coupon_amount_scan_by_karigar: any;
    aniversary:any =[];
    birthday:any =[];
    birthday_karigar: any =[];
    birthday_dealer: any =[];
    aniversary_karigar:any =[];
    aniversary_dealer: any =[];

    
    constructor(public db: DatabaseService, private router:Router) 
    {
        this.get_counts();
        this.get_super_karigars();
        this.get_super_dealers();
        this.get_offer_balance_days();
        this.state_wise_karigar();
        this.state_wise_dealer();
        this.state_wise_distributor();
        this.coupon_code_graph();
        this.get_scan_coupon_data();
        this.showAnniversaryDealer();
        // this.get_anni_dealer();
        this.get_anni_karigars();
        this.showBirthdayDealer();
        this.showBirthdayCarpenter();
    }
    
    ngOnInit() 
    {
        
    }
    
    get_counts() 
    {
        this.loading_list = true;
        
        this.db.post_rqst({ }, 'master/getDashboardcounts').subscribe(resp => 
            {
                this.loading_list = false;
                console.log(resp);
                this.balance_coupon_value = resp.balance_coupon_value;
                this.karigars = resp.karigars;
                this.karigars = resp.karigars;

                this.offer_karigar=resp.offer_karigar;
                this.offer_Retailer=resp.offer_Retailer;
                this.offer = resp.offer;
                this.total_coupon_value=resp.total_coupon_value;
                this.total_coupon_amount=resp.total_coupon_amount;
                this.pending_couopn_amount=resp.pending_couopn_amount;
                this.coupon_amount_scan_by_karigar=resp.coupon_amount_scan_by_karigar;

                this.coupon_value_scan_by_Retailer=resp.coupon_value_scan_by_Retailer;
                this.coupon_value_scan_by_karigar=resp.coupon_value_scan_by_karigar;
                this.pending_redeem_request_karigar=resp.pending_redeem_request_karigar;
                this.pending_redeem_request_retailer=resp.pending_redeem_request_retailer;
                this.offer_gift = resp.offer_gift;
                this.pending_redeem_request = resp.pending_redeem_request;
                this.products = resp.products;
                this.totalNetwork=resp.user;
                this.user_karigar=resp.user_karigar;
                this.user_Retailer=resp.user_Retailer;
                this.user_Distributor=resp.user_Distributor;
                this.unread_counts=resp.unread;
            });
        }
        
        get_super_karigars()
        {
            this.loading_list = true;
            
            this.db.post_rqst({ }, 'master/getSuperkarigars')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.super_karigars = resp.super_karigars;
            });
        }


        get_super_dealers()
        {
            this.loading_list = true;
            
            this.db.post_rqst({ }, 'master/getSuperkarigars')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.super_dealers = resp.super_Retailers;
                for(var i=0; i<this.super_dealers.length; i++)
                {
                  
                    this.super_dealers[i]['total_wallet_point'] = parseInt(this.super_dealers[i]['balance_point']) + parseInt(this.super_dealers[i]['referal_point_balance']);
                }
            });
        }
        
        get_anni_karigars()
        {
            this.loading_list = true;
            console.log(this.loading_list);
            
            
            this.db.post_rqst({ }, 'master/nextweekanniversarycarpenter')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.aniversary= resp.next_anniversary;
                console.log(this.aniversary_karigar);
                
            });
        }


        showAnniversaryDealer(){
            this.loading_list = true;
            this.db.post_rqst({},'master/nextweekanniversary')
            .subscribe((resp)=>
            {
                this.loading_list = false;
                this.aniversary= resp.next_anniversary;
            });
        }

        showBirthdayDealer(){
            this.loading_list = true;
            this.db.post_rqst({},'master/nextweekbirthday')
            .subscribe((resp)=>
            {
                this.loading_list = false;

                console.log(resp);
                this.birthday= resp.next_birthday;
            });
        }

        get_offer_balance_days()
        {
            this.loading_list = true;
            this.db.post_rqst({ }, 'master/getOfferBalanceDays')
            .subscribe((resp) => 
            {
                this.loading_list = false;
                console.log(resp);
                this.offer_balance_days = resp.offer_balance_days;
            });
        }
        
        state_wise_karigar()
        {
            this.db.post_rqst({},'master/stateWiseKarigar')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseKarigar=resp.state_wise_karigars;
                
                for (let i=0;i < this.stateWiseKarigar.length; i++)
                {
                    this.karigar_state_wise.push({"label": this.stateWiseKarigar[i].state,"value": this.stateWiseKarigar[i].total_karigars});
                }
                console.log(this.karigar_state_wise);
                
                this.karigar_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Plumber",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.karigar_state_wise            
                };
            })
        }

        state_wise_dealer(){
            this.db.post_rqst({},'master/stateWiseKarigar')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseDealer=resp.state_wise_Retailer;
                
                for (let i=0;i < this.stateWiseDealer.length; i++)
                {
                    this.dealer_state_wise.push({"label": this.stateWiseDealer[i].state,"value": this.stateWiseDealer[i].total_retailer});
                }
                console.log(this.dealer_state_wise);
                
                this.dealer_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Retailer",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.dealer_state_wise            
                };
            })
        }

        state_wise_distributor(){

            this.db.post_rqst({},'master/stateWiseKarigar')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.stateWiseDistributor=resp.state_wise_Distributor;
                
                for (let i=0;i < this.stateWiseDistributor.length; i++)
                {
                    this.distributor_state_wise.push({"label": this.stateWiseDistributor[i].state,"value": this.stateWiseDistributor[i].total_distributor});
                }
                console.log(this.distributor_state_wise);
                
                this.distributor_Source = {
                    "chart": {
                        "xAxisName": "States",
                        "yAxisName": "Distributors",
                        // "numberSuffix": "k",
                        "theme": "fusion",
                    },
                    "data": this.distributor_state_wise            
                };
            })

        }

        showDealersList=false;
        showKarigarList=true;
        show_karigar_graph=true;
        show_dealer_graph=false;
        karigar_anni_graph=true;
        dealer_anni_graph=false;

        karigar_birth_graph=true;
        dealer_birth_graph=false;


        KarigarAnniGraph(){
            console.log("click");
            this.karigar_anni_graph=true;
            this.dealer_anni_graph=false;
            this.get_anni_karigars();
        }

        DealerAnniGraph(){
            console.log("click");
            this.dealer_anni_graph=true;
            this.karigar_anni_graph=false;
            this.showAnniversaryDealer();
        }

        showDealers(){
            console.log("click");
            this.showDealersList=true;
            this.showKarigarList=false;
            this.get_super_dealers();
        }
        showKarigar(){
            this.showDealersList=false;
            this.showKarigarList=true;
            this.get_super_karigars();
        }
        showKarigarGraph(){
            this.show_karigar_graph=true;
            this.show_dealer_graph=false;
        }
        showDealerGraph(){
            this.show_karigar_graph=false;
            this.show_dealer_graph=true;
        }
        
        KarigarBirthGraph(){
            console.log("click");
            this.karigar_birth_graph=true;
            this.dealer_birth_graph=false;
            this.showBirthdayCarpenter();
        }

        DealerBirthGraph(){
            console.log("click");
            this.dealer_birth_graph=true;
            this.karigar_birth_graph=false;
            this.showBirthdayDealer();
        }

        showBirthdayCarpenter(){
            this.db.post_rqst({},'master/nextweekbirthdaycarpenter')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.birthday= resp.next_birthday;
            });
        }
      
       

        total_coupon_code_data : any = [];
        scanned_coupon_code_data : any = [];
        total_coupon:any=[];
        scanned_coupon:any=[];
        offer_name:any=[];
        
        
        coupon_code_graph()
        {
            this.db.post_rqst({},'master/get_coupon_code_graph_data')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.total_coupon_code_data = resp.total_coupon;
                this.scanned_coupon_code_data = resp.scanned_coupon;
                
                for(var i=0; i<this.total_coupon_code_data.length; i++)
                {
                    this.total_coupon.push({"value":this.total_coupon_code_data[i]['total_coupon']});
                    
                    this.offer_name.push({"label":this.total_coupon_code_data[i]['title']});
                }
                
                for(var j=0; j<this.scanned_coupon_code_data.length; j++)
                {
                    this.scanned_coupon.push({"value":this.scanned_coupon_code_data[j]['scan_coupon']})
                }
                
                this.dataSource = {
                    chart: {
                        xaxisname: "Offer Name",
                        yaxisname: "Total Number of Coupons",
                        formatnumberscale: "1",
                        plottooltext:
                        "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
                        theme: "fusion",
                        drawcrossline: "1"
                    },
                    categories: [{category : this.offer_name}],
                    dataset:[{seriesname:"Total Coupons", data:this.total_coupon}, {seriesname:"Scanned Coupons", data:this.scanned_coupon}]
                };
            });
        }
        
        
        get_scan_coupon_data()
        {
            this.db.post_rqst({},'master/scanCoupondata')
            .subscribe((resp)=>
            {
                console.log(resp);
                this.scan_coupon_count = resp.scan_coupon_count;
                
                for (let i=0;i < this.scan_coupon_count.length; i++)
                {
                    this.coupon_count.push({"label": this.scan_coupon_count[i].scan_day,"value": this.scan_coupon_count[i].scan_coupon_count});
                }
                
                this.dataSource1 = {
                    "chart": {
                        "xAxisName": "Day's",
                        "yAxisName": "No. of Coupons",
                        "showValues": "0",
                        "theme": "fusion"
                    },
                    "annotations": {
                        "groups": [{
                            "id": "anchor-highlight",
                            "items": [{
                                "id": "high-star",
                                "type": "circle",
                                "x": "$dataset.0.set.2.x",
                                "y": "$dataset.0.set.2.y",
                                "radius": "12",
                                "color": "#6baa01",
                                "border": "2",
                                "borderColor": "#f8bd19"
                            }
                        ]
                    }]
                },
                "data": this.coupon_count
            }
        })  
    }
    
    
    
    goto_offerPage()
    {
        this.router.navigate(["offer-list/active"]);
    }
    
    goto_offergiftPage()
    {
        this.router.navigate(['gift-list']);
    }
    
    goto_pending_redeem_rqs_page()
    {
        this.router.navigate(['redeem-request-list/pending']);
    } 
    
    goto_balance_coupon_page()
    {
        this.router.navigate(['coupon-code-list']);
    }
    
    goto_karigarsPage(action)
    {
        // this.router.navigate(['karigar-list']);

        if(action === 'Plumber'){   
            this.router.navigate(['karigar-list/1'],{queryParams:{mode:action}});
        }else if(action === 'Retailer'){
            this.router.navigate(['dealer-list/1'],{queryParams:{mode:action}});
        }
        else if(action === 'Distributor'){
            this.router.navigate(['distributor-list/1'],{queryParams:{mode:action}});
        }
    }
    
    goto_productPage()
    {
        this.router.navigate(['products-list']);
    }
    goto_feedbackPage()
    {
        this.router.navigate(['feedback-list']);
    }
    
}
