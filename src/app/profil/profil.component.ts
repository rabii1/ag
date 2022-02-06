import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Superadmin } from '../superadmin.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  Usernom:string="";
  Userprenom:string="";
  Useremail:string="";
  Userfax:string="";
  Usertel:string="";
  Userrole:string="";
  Usergrade:string="";
  constructor(private sessionSotragesevice:SessionstorageService, private headerTitleService: HeaderTitleService,) { }

  ngOnInit(): void {
    console.log('SessionStorage');
    this.Usernom=this.sessionSotragesevice.get( 'UserNom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    this.Userfax=this.sessionSotragesevice.get( 'Userfax');
    this.Userrole=this.sessionSotragesevice.get( 'UserRole');
    console.log(this.sessionSotragesevice.get( 'UserRole'));
    this.Usergrade=this.sessionSotragesevice.get( 'UserGrade');

    
    console.log(this.Userprenom)
    this.headerTitleService.setTitle('Profil');console.log('profil')


  }

}
