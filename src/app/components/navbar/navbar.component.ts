import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { Superadmin } from 'src/app/superadmin.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  superadmin:any;
  admin:any;
  Userrole:string="";
  title='';
  constructor(  private headerTitleService: HeaderTitleService
    ,private sessionSotragesevice:SessionstorageService) { }

  ngOnInit(): void {

    




    //get user role
  this.Userrole = this.sessionSotragesevice.get('UserRole');
  }
 
}
