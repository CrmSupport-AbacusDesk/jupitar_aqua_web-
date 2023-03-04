import { Component } from '@angular/core';
import {SessionStorage} from './_services/SessionService';
// import { ConnectionService } from 'connection-service';
// import { ConnectionService } from 'connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  status = 'ONLINE';
  isConnected = true;
 
  constructor( public ses: SessionStorage) {
    
    // this.connectionService.monitor().subscribe(isConnected => {
    //   this.isConnected = isConnected;
    //   if (this.isConnected) {
    //     this.status = "ONLINE";
    //   }
    //   else {
    //     this.status = "OFFLINE";
    //   }
    // })
   }


  title = 'Advance Laminate';

  isLoggedIn() {

    return this.ses.users.logged;

  }
}
