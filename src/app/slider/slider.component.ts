import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/DatabaseService';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  // styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  index = 0;
  speed = 2000;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = '12345'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    console.log( this.avatars );
    this.loginBanner();
  }


  banner:any = [];


  loginBanner(){
    this.db.login_get_rqst( '', 'app_karigar/banners' )
    .subscribe(d => {
        this.banner = d.banner;
        console.log(this.banner);

        this.avatars = this.banner.map((x, i) => {
          const num = i;
          return {
            url: this.db.myurl+'app/uploads/'+x.banner,
            title: ''
          };
        });

console.log(  this.avatars);


    });
  }
  
}
