import { UploaddigitalcatComponent } from './uploaddigitalcat/uploaddigitalcat.component';
import { CouponCodeMasterComponent } from './coupon-code-master/coupon-code-master.component';
import { ConvertArray } from './_Pipes/ConvertArray.pipe';
import { StrReplace } from './_Pipes/StrReplace.pipe';
import { Crypto } from './_Pipes/Crypto.pipe';
import { DatePikerFormat } from './_Pipes/DatePikerFormat.pipe';
import { AuthGuard } from './_guards/AuthGuard';
import { AuthGuardLog } from './_guards/AuthGuardLog';
import { DatabaseService } from './_services/DatabaseService';
import { NumericWords } from './_Pipes/NumericWords.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatProgressBarModule} from '@angular/material';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MaterialModule} from './material';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {OfferListComponent } from './offer/offer-list/offer-list.component';
import {AddOfferComponent } from './offer/add-offer/add-offer.component';
import {OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import {GiftRedeemModuleComponent } from './offer/gift-redeem-module/gift-redeem-module.component';
import {TransferCodeComponent } from './offer/transfer-code/transfer-code.component';
import {GiftListComponent } from './gift-gallery/gift-list/gift-list.component';
import {GiftDetailComponent } from './gift-gallery/gift-detail/gift-detail.component';
import {ProductcategoryListComponent } from './master/productcategory-list/productcategory-list.component';
import {ProductsListComponent } from './master/products-list/products-list.component';
import {NewsComponent } from './master/news/news.component';
import {VideoComponent } from './master/video/video.component';
import {LoginBannerComponent } from './master/login-banner/login-banner.component';
import {SalesExecutiveComponent } from './master/sales-executive/sales-executive.component';
import {ChangeStatusComponent } from './gift-gallery/change-status/change-status.component';
import {RedeemRequestListComponent } from './redeem-request/redeem-request-list/redeem-request-list.component';
import { RedeemRequestDetailComponent } from './redeem-request/redeem-request-detail/redeem-request-detail.component';
import {KarigarListComponent } from './karigar/karigar-list/karigar-list.component';
import {KarigarAddComponent } from './karigar/karigar-add/karigar-add.component';
import {KarigarDetailComponent } from './karigar/karigar-detail/karigar-detail.component';
import {CouponDetailsComponent } from './karigar/coupon-details/coupon-details.component';
import {CouponCodeListComponent } from './coupon-codes/coupon-code-list/coupon-code-list.component';
import {AboutComponent } from './about/about.component';
import {ServiceComponent } from './service/service.component';
import { VideoSafe } from './_Pipes/VideoSafe.pipe';
import { ProductImageModuleComponent } from './master/product-image-module/product-image-module.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ChangeKarigarStatusComponent } from './karigar/change-karigar-status/change-karigar-status.component';
import { ImportStatusModelComponent } from './offer/import-status-model/import-status-model.component';
import { KarigarBalanceModelComponent } from './karigar/karigar-balance-model/karigar-balance-model.component';
import { ChangeStatusRedeemComponent } from './redeem-request/change-status-redeem/change-status-redeem.component';
import { EditGiftComponent } from './offer/edit-gift/edit-gift.component';
import { DeactiveStatusComponent } from './deactive-status/deactive-status.component';
import { KarigarDetailModuleComponent } from './master/karigar-detail-module/karigar-detail-module.component';
import { ShippedDetailModelComponent } from './redeem-request/shipped-detail-model/shipped-detail-model.component';
import { SliderComponent } from './slider/slider.component';
import { ReopenRemarkModleComponent } from './offer/reopen-remark-modle/reopen-remark-modle.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { ProductcategoryDescModuleComponent } from './master/productcategory-desc-module/productcategory-desc-module.component';
import { CouponSummaryModleComponent } from './offer/coupon-summary-modle/coupon-summary-modle.component';
import { FeedbackReplyModleComponent } from './feedback-reply-modle/feedback-reply-modle.component';
import { DailyCouponAccessComponent } from './master/daily-coupon-access/daily-coupon-access.component';
import { CompanyProfileComponent } from './master/company-profile/company-profile.component';
import { TermConditionImageComponent } from './offer/term-condition-image/term-condition-image.component';
import { ReedemCouponSummaryComponent } from './karigar/reedem-coupon-summary/reedem-coupon-summary.component';
import { CouponCodeModalComponent } from './coupon-codes/coupon-code-modal/coupon-code-modal.component';
import { ReferralMasterComponent } from './master/referral-master/referral-master.component';
import { DistributorComponent } from './master/distributor/distributor.component';
import { DemoKarigarComponent } from './master/demo-karigar/demo-karigar.component';
import { MastetDateFilterModelComponent } from './mastet-date-filter-model/mastet-date-filter-model.component';
import { SiteGalleryComponent } from './site-gallery/site-gallery.component';
import { FurnitureIdeaComponent } from './furniture-idea/furniture-idea.component';
import { FurnitureSubIdeaComponent } from './furniture-sub-idea/furniture-sub-idea.component';

import { FaqQuestionnaireComponent } from './faq-questionnaire/faq-questionnaire.component';
import { ManualAssignModelComponent } from './coupon-codes/manual-assign-model/manual-assign-model.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { KarigarDataComponent } from './master/karigar-data/karigar-data.component';
import { SendmessageComponent } from './master/karigar-data/sendmessage/sendmessage.component';
import { ImportcodeComponent } from './master/karigar-data/importcode/importcode.component';
import { BonusPointModelComponent } from './karigar/bonus-point-model/bonus-point-model.component';
import { NotificationHistoryComponent } from './master/notification-history/notification-history.component';
import { SendNotificationComponent } from './master/karigar-data/send-notification/send-notification.component';
import { MessageHistoryComponent } from './master/message-history/message-history.component';
import { DealerListComponent } from './dealer/dealer-list/dealer-list.component';
import { DistributorListComponent } from './distributor/distributor-list/distributor-list.component';
import { DealerDetailComponent } from './dealer/dealer-detail/dealer-detail.component';
import { DistributorDetailComponent } from './distributor/distributor-detail/distributor-detail.component';
import { DealerAddComponent } from './dealer/dealer-add/dealer-add.component';
import { DistributorAddComponent } from './distributor/distributor-add/distributor-add.component';
import { AppBannerComponent } from './app-banner/app-banner.component';
import { AssignRelatedProductsComponent } from './master/assign-related-products/assign-related-products.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {AddgiftComponent} from '../app/addgift/addgift.component';
import {GiftsComponent} from '../app/gifts/gifts.component';
import { AddCouponCodesComponent } from './coupon-codes/add-coupon-codes/add-coupon-codes.component';
import { ContractorListComponent } from './contractor/contractor-list/contractor-list.component';
import { ContractorSatusModalComponent } from './contractor/contractor-satus-modal/contractor-satus-modal.component';
import { ChangeTypeModalComponent } from './change-type-modal/change-type-modal.component';
import { MasterTabComponent } from './master-tab/master-tab.component';
import { DigitallistComponent } from './digitallist/digitallist.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

const routes: Routes = [
  {path: '', component:LoginComponent , canActivate: [AuthGuardLog] },
  {path: 'dashboard', component:DashboardComponent  , canActivate: [AuthGuard] },
  {path: 'offer-list', component: OfferListComponent  , canActivate: [AuthGuard] },
  {path: 'add-offer', component:AddOfferComponent , canActivate: [AuthGuard] },
  {path: 'add-gift', component:AddgiftComponent , canActivate: [AuthGuard] },
  {path: 'add-gift/:id', component:AddgiftComponent , canActivate: [AuthGuard] },

  {path: 'gifts', component:GiftsComponent , canActivate: [AuthGuard] },
  {path: 'edit-offer/:offer_id', component:EditOfferComponent , canActivate: [AuthGuard] },
  {path: 'offer-detail/:offer_id', component:OfferDetailComponent , canActivate: [AuthGuard] },
  {path: 'gift-list', component:GiftListComponent , canActivate: [AuthGuard] },
  {path: 'gift-detail/:gift_id', component:GiftDetailComponent , canActivate: [AuthGuard] },
  {path: 'productcategory-list', component:ProductcategoryListComponent , canActivate: [AuthGuard] },
  {path: 'referral-master', component:ReferralMasterComponent , canActivate: [AuthGuard] },
  {path: 'products-list', component:ProductsListComponent , canActivate: [AuthGuard] },
  {path: 'demo-karigar-list', component:DemoKarigarComponent , canActivate: [AuthGuard] },
  {path: 'news-list', component:NewsComponent , canActivate: [AuthGuard] },
  {path: 'video-list', component:VideoComponent , canActivate: [AuthGuard] },
  {path: 'login-banner-list', component:LoginBannerComponent , canActivate: [AuthGuard] },
  {path: 'app-banner-list', component:AppBannerComponent , canActivate: [AuthGuard] },
  {path: 'sales-executive-list', component:SalesExecutiveComponent , canActivate: [AuthGuard] },
  {path: 'redeem-request-list', component:RedeemRequestListComponent , canActivate: [AuthGuard] },
  {path: 'redeem-request-detail/:redeem_id', component:RedeemRequestDetailComponent , canActivate: [AuthGuard] },
  {path: 'karigar-list/:page', component:KarigarListComponent , canActivate: [AuthGuard] },
  {path:'dealer-list/:page',component:DealerListComponent,canActivate:[AuthGuard]},
  {path:'dealer-detail/:dealer_id/:page',component:DealerDetailComponent,canActivate:[AuthGuard]},
  {path:'dealer-add/:dealer_id',component:DealerAddComponent,canActivate:[AuthGuard]},
  {path:'dealer-add',component:DealerAddComponent,canActivate:[AuthGuard]},
  {path:'distributor-add',component:DistributorAddComponent,canActivate:[AuthGuard]},
  {path:'distributor-list/:page',component:DistributorListComponent,canActivate:[AuthGuard]},
  {path:'distributor-detail/:distributor_id/:page',component:DistributorDetailComponent,canActivate:[AuthGuard]},
  {path:'distributor-add/:distributor_id',component:DistributorAddComponent,canActivate:[AuthGuard]},
  {path: 'karigar-add', component:KarigarAddComponent , canActivate: [AuthGuard] },
  {path: 'karigar-add/:karigar_id', component:KarigarAddComponent , canActivate: [AuthGuard] },
  {path: 'karigar-detail/:karigar_id',  component:KarigarDetailComponent , canActivate: [AuthGuard] },
  {path: 'karigar-detail/:karigar_id/:page',  component:KarigarDetailComponent , canActivate: [AuthGuard] },
  {path: 'coupon-code-list',  component:CouponCodeListComponent , canActivate: [AuthGuard] },
  {path: 'feedback-list',  component:FeedbackComponent , canActivate: [AuthGuard] },
  {path: 'site-gallery',  component:SiteGalleryComponent , canActivate: [AuthGuard] },
  {path: 'furniture-ideas',  component:FurnitureIdeaComponent , canActivate: [AuthGuard] },
  {path: 'karigar-data',  component:KarigarDataComponent , canActivate: [AuthGuard] },
  {path: 'faq-questionnaire',  component:FaqQuestionnaireComponent , canActivate: [AuthGuard] },
  {path: 'furniture-detail/:params', component:FurnitureSubIdeaComponent , canActivate: [AuthGuard] },
  {path: 'slider',  component:SliderComponent},
  {path: 'offer-list/:active',  component:OfferListComponent , canActivate: [AuthGuard] },
  {path: 'redeem-request-list/:pending', component:RedeemRequestListComponent , canActivate: [AuthGuard] },
  {path: 'daily-coupon-access', component:DailyCouponAccessComponent , canActivate: [AuthGuard] },
  {path: 'company-profile', component:CompanyProfileComponent , canActivate: [AuthGuard] },
  {path: 'distributor-list', component:DistributorComponent , canActivate: [AuthGuard] },
  {path: 'notification-history', component:NotificationHistoryComponent , canActivate: [AuthGuard] },
  {path: 'message-history', component:MessageHistoryComponent , canActivate: [AuthGuard] },
  {path: 'add-coupon', component:AddCouponCodesComponent , canActivate: [AuthGuard] },
  {path: 'contractor-list', component:ContractorListComponent , canActivate: [AuthGuard] },
  {path: 'coupon-code-master', component:CouponCodeMasterComponent , canActivate: [AuthGuard]},
  {path: 'digitallist', component:DigitallistComponent , canActivate: [AuthGuard]},




  { path: '**', redirectTo: ''},
];


@NgModule({
  declarations: [
    DialogComponent,
    NumericWords,
    ConvertArray,
    StrReplace,
    Crypto,
    VideoSafe,
    DatePikerFormat,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    OfferListComponent,
    AddOfferComponent,
    OfferDetailComponent,
    GiftRedeemModuleComponent,
    ProductImageModuleComponent,
    TransferCodeComponent,
    GiftListComponent,
    GiftDetailComponent,
    ProductcategoryListComponent,
    ProductsListComponent,
    NewsComponent,
    VideoComponent,
    LoginBannerComponent,
    SalesExecutiveComponent,
    ChangeStatusComponent,
    RedeemRequestListComponent,
    RedeemRequestDetailComponent,
    KarigarListComponent,
    KarigarAddComponent,
    KarigarDetailComponent,
    CouponDetailsComponent,
    CouponCodeListComponent,
    // ProductImageModuleComponent,
    AboutComponent,
    ServiceComponent,
    EditOfferComponent,
    FeedbackComponent,
    ChangeKarigarStatusComponent,
    ImportStatusModelComponent,
    KarigarBalanceModelComponent,
    ChangeStatusRedeemComponent,
    EditGiftComponent,
    DeactiveStatusComponent,
    KarigarDetailModuleComponent,
    ShippedDetailModelComponent,
    SliderComponent,
    ReopenRemarkModleComponent,
    ProductcategoryDescModuleComponent,
    CouponSummaryModleComponent,
    FeedbackReplyModleComponent,
    DailyCouponAccessComponent,
    CompanyProfileComponent,
    TermConditionImageComponent,
    ReedemCouponSummaryComponent,
    CouponCodeModalComponent,
    ReferralMasterComponent,
    DistributorComponent,
    DemoKarigarComponent,
    MastetDateFilterModelComponent,
    SiteGalleryComponent,
    FurnitureIdeaComponent,
    FurnitureSubIdeaComponent,
    FaqQuestionnaireComponent,
    ManualAssignModelComponent,
    KarigarDataComponent,
    SendmessageComponent,
    ImportcodeComponent,
    BonusPointModelComponent,
    NotificationHistoryComponent,
    SendNotificationComponent,
    MessageHistoryComponent,
    DealerListComponent,
    DistributorListComponent,
    DealerDetailComponent,
    DistributorDetailComponent,
    DealerAddComponent,
    DistributorAddComponent,
    AppBannerComponent,
    AssignRelatedProductsComponent,
    AddgiftComponent,
    GiftsComponent,
    AddCouponCodesComponent,
    ContractorListComponent,
    ContractorSatusModalComponent,
    ChangeTypeModalComponent,
    MasterTabComponent,
    CouponCodeMasterComponent,
    MasterTabComponent,
    UploaddigitalcatComponent,
    DigitallistComponent


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    MatInputModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatVideoModule,
    NgxEditorModule,
    MatAutocompleteModule,
    AngularFontAwesomeModule,
    NgxHmCarouselModule,
    FusionChartsModule,
    MatExpansionModule,
    FilterPipeModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    AuthGuard,
    AuthGuardLog,
    DatabaseService
  ],
  
  entryComponents: [
    GiftRedeemModuleComponent,
    UploaddigitalcatComponent,
    TransferCodeComponent,
    ChangeStatusComponent,
    CouponDetailsComponent,
    ProductImageModuleComponent,
    ChangeKarigarStatusComponent,
    ImportStatusModelComponent,
    KarigarBalanceModelComponent,
    ChangeStatusRedeemComponent,
    ChangeStatusRedeemComponent,
    DeactiveStatusComponent,
    KarigarDetailModuleComponent,
    EditGiftComponent,
    ReopenRemarkModleComponent,
    ShippedDetailModelComponent,
    ProductcategoryDescModuleComponent,
    CouponSummaryModleComponent,
    FeedbackReplyModleComponent,
    TermConditionImageComponent,
    ReedemCouponSummaryComponent,
    CouponCodeModalComponent,
    ManualAssignModelComponent,
    MastetDateFilterModelComponent,
    ImportcodeComponent,
    SendmessageComponent,
    BonusPointModelComponent,
    SendNotificationComponent,
    AssignRelatedProductsComponent,
    ContractorSatusModalComponent,
    ChangeTypeModalComponent
  ],
  
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class DatepickerModule {}
