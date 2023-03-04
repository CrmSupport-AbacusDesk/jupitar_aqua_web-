import {Component,OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {SessionStorage} from '../../_services/SessionService';
import { DeactiveStatusComponent } from 'src/app/deactive-status/deactive-status.component';
import { MatDialog } from '@angular/material';




@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
})
export class VideoComponent implements OnInit {

  savingData = false;
  vedioForm: any = {};
  loading_list = false;
  total_vedios:any = 0;
  vedios:any =[];

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent,public alrt:MatDialog) {}

  ngOnInit() {
    this.getVedioList('');
  }

  last_page: number ;
  current_page = 1;
  search: any = '';
  source: any = '';
  searchData = true;
  isInvoiceDataExist = false;
  filter:any = {};
  filtering : any = false;

  redirect_previous() {
    this.current_page--;
    this.getVedioList('');
  }
  redirect_next() {
    if (this.current_page < this.last_page) { this.current_page++; }
    else { this.current_page = 1; }
    this.getVedioList('');
  }
  toggle:any;
  saveVedio(form:any) {
    this.savingData = true;
    if(this.vedios.id){
      this.vedioForm.edit_vedio_id = this.vedios.id;
    }
    this.vedioForm.created_by = this.db.datauser.id;
    this.db.post_rqst( { 'video' : this.vedioForm }, 'master/videoAdd')
    .subscribe( d => {
      this.savingData = false;
      console.log( d );
      if(d['status'] == 'EXIST' ){
        this.dialog.error( 'This Vedio Already exists');
        return;
      }
      this.toggle = "false"
      this.router.navigate(['video-list']);
      this.dialog.success( 'video successfully save');
      this.getVedioList('');
    });
  }

  editvideo(id,index){
    console.log(id);
    
    console.log(index)
    let data = this.vedios.filter( x => x.id==id);
    this.vedioForm=data[0];
    this.vedios.id= this.vedioForm.id;
    console.log( this.vedios.id);
    console.log(this.vedioForm);
  }

  addVideo()
  {
    this.vedioForm={};
    console.log("dscds");
    
  }

  getData:any = {};
  getVedioList(action) {
  console.log(this.db.datauser);
  
  this.loading_list = true;
  if( this.filter.date || this.filter.location_id )this.filtering = true;

  if(action=='refresh')
  {
    this.filter={}
  }
  this.db.post_rqst({ 'filter': this.filter}, 'master/videoList?page=' + this.current_page )
  .subscribe(d => {
      console.log(d);

      this.current_page = d.video.current_page;
      this.last_page = d.video.last_page;
      this.total_vedios =d.video.total;
      this.vedios = d.video.data;

      for(let i=0;i<this.vedios.length;i++)
      {
        if(this.vedios[i].status=="Active")
        {
          this.vedios[i].newsStatus=true;
        }
        else if(this.vedios[i].status=="Deactive")
        {
          this.vedios[i].newsStatus=false;
        }
      }

      console.log( this.vedios );
   
    this.loading_list = false;
  });
}



     deleteProduct(id) {
      this.dialog.delete('Vedio').then((result) => {
        if(result) {
      this.db.post_rqst({ id : id}, 'master/videoDelete')
      .subscribe(d => {
        console.log(d);
        this.getVedioList('');
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
              'id' : this.vedios[i].id,
              'type':'video',
              'checked' : event.checked,
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              if( result ){
                this.getVedioList('');
            }
            this.getVedioList('');
            });
        }
        else if(event.checked == true)
        {
          this.db.post_rqst({'checked' : event.checked, 'id' : this.vedios[i].id,'login_id':this.db.datauser.id}, 'master/videoStatus')
          .subscribe(d => {
            console.log(d);
            this.dialog.success( 'Status Change successfully ');
            this.getVedioList('');
          });
        }
      }

}
