import { Component, NgZone } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
//import { SailsClient } from 'ngx-sails';
import { SessionstorageService } from './services/sessionstorage.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GMAO';
  showHead: boolean = false;
  daten= "Getting info en cours ..."
  listAction:any=[];


  constructor(  private router: Router,private sessionStorage:SessionstorageService) {}

  ngOnInit() {
  
  
  }
 
 
  public emitEventWithoutAResponse(): void {
 
 
   //this.sails.emit('eventName', 'arg1', 'arg2');
    
  }
 
  public emitEventWithAResponse(): void {
    //this.sails.emitAndWait('eventName', 'arg1', 'arg2').subscribe((response:any)  => {})
  }

  // on route change to '/login', set the variable showHead to false
  //   router.events.forEach((event) => {
  //     if (event instanceof NavigationStart) {
  //       if (event['url'] == '/login') {
  //         this.showHead = false;
  //       } else {
  //         // console.log("NU")
  //         this.showHead = true;
  //       }
  //     }
  //   });
 
}
