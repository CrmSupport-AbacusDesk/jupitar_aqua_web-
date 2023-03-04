import {Component,OnInit} from '@angular/core';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { ProductImageModuleComponent } from '../product-image-module/product-image-module.component';
import { MatDialog } from '@angular/material';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {
  
  loading_list = false;
  news:any = [];
  total_news:any = 0;
  savingData = false;
  
  
  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent , public alrt:MatDialog) {}
    
    ngOnInit() {
      
      this.getNewsList('');
    }
    
    last_page: number ;
    current_page = 1;
    search: any = '';
    source: any = '';
    searchData = true;
    isInvoiceDataExist = false;
    filter:any = {};
    filtering : any = false;
    newsForm: any = {};
    
    
    redirect_previous() {
      this.current_page--;
      this.getNewsList('');
    }
    redirect_next() {
      if (this.current_page < this.last_page) { this.current_page++; }
      else { this.current_page = 1; }
      this.getNewsList('');
    }
    
    getData:any = {};
    getNewsList(action) {
      console.log(this.db.datauser);
      
      this.loading_list = true;
      if( this.filter.date || this.filter.location_id )this.filtering = true;

      if(action=='refresh')
      {
        this.filter={};
      }
      this.db.post_rqst({ 'filter': this.filter}, 'master/newsList?page=' + this.current_page )
      .subscribe(d => {
        console.log(d);
        
        this.current_page = d.news.current_page;
        this.last_page = d.news.last_page;
        this.total_news =d.news.total;
        this.news = d.news.data;
        
        for(let i=0;i<this.news.length;i++)
        {
          if(this.news[i].status=="Active")
          {
            this.news[i].newsStatus=true;
          }
          else if(this.news[i].status=="Deactive")
          {
            this.news[i].newsStatus=false;
          }
        }
        
        console.log( this.news );
        
        this.loading_list = false;
      });
    }
    newss:any={};
    editNews(id,index){
      console.log(id);
      
      console.log(index)
      let data = this.news.filter( x => x.id==id);
      this.newsForm=data[0];
      this.newss.id= this.newsForm.id;
      console.log( this.newss.id);
      
      console.log(this.newsForm);
      
    }
    
    toggle:any;
    saveNews(form:any) {
      this.savingData = true;
      if(this.newss.id){
        this.newsForm.edit_news_id = this.newss.id;
      }
      this.newsForm.created_by = this.db.datauser.id;
      this.db.post_rqst( { 'news' : this.newsForm }, 'master/addNews')
      .subscribe( d => {
        this.savingData = false;
        console.log( d );
        if(d['status'] == 'EXIST' ){
          this.dialog.error( 'This News Already exists');
          return;
        }
        this.toggle = "false"
        this.router.navigate(['news-list']);
        this.dialog.success( 'News successfully save');
        this.getNewsList('');
      });
    }
    
    
    
    addNews()
    {
      this.newsForm={};
      console.log("dscds");
      
    }
    
    onUploadChange(evt: any) {
      const file = evt.target.files[0];
      console.log(file);
      
      if (file) {
        const reader = new FileReader();
        
        console.log( this.handleReaderLoaded.bind(this) );
        
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }
    
    handleReaderLoaded(e) {
      console.log(e);
      
      this.newsForm.image = 'data:image/png;base64,' + btoa(e.target.result) ;
      console.log( this.newsForm.image  );
      
    }

    deleteProduct(id) {
      this.dialog.delete('News').then((result) => {
        if(result) {
      this.db.post_rqst({ news_id : id}, 'master/newsDelete')
      .subscribe(d => {
        console.log(d);
        this.getNewsList('');
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
        console.log('false');
        
        const dialogRef = this.alrt.open(DeactiveStatusComponent,
          {
            width: '500px',
            height:'500px',
            
            data: {
              'id' : this.news[i].id,
              'type':'news',
              'checked' : event.checked,
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if( result ){
              this.getNewsList('');
            }
            this.getNewsList('');
          });
        }
        else if(event.checked == true)
        {
          
          this.db.post_rqst({'checked' : event.checked, 'id' : this.news[i].id,'login_id':this.db.datauser.id}, 'master/newsStatus')
          .subscribe(d => {
            console.log(d);
            this.dialog.success( 'Status Change successfully ');
            this.getNewsList('');
          });
        }
      }
      
      openDialog(id ,string ) {
        const dialogRef = this.alrt.open(ProductImageModuleComponent,
          
          {
            // width: '500px',
            // height:'500px',
            data: {
              'id' : id,
              // 'product_id' : this.franchise_id,
              'mode' : string,
            }
          });
          
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
          
        }
      }
      
      