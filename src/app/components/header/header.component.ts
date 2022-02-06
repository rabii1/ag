import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { SuperAdmin } from 'src/app/super-admin.model';
import { Superadmin } from 'src/app/superadmin.model';
declare var $:any;
declare var Waves:any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ordreintervention:any=[];

  title = '';
  title1='';
  Superadmin:any=[]
  currentUser:any= Superadmin;
  id: any;
  superadmin :any= SuperAdmin;
  CurrentUserConnected:any= Superadmin;
  user:any=Superadmin;
  userNom:string="";
  path: string[] = [];
  pathTitle: any;
  NBordre:any=0;
  Userrole:string="";
  constructor(private router:Router,private Serviceapibackend: BackendApiService,
    private authService:BackendApiService,
    private route: ActivatedRoute,private sessionSotragesevice:SessionstorageService,
    private headerTitleService: HeaderTitleService, private activatedRoute:    ActivatedRoute, ) {

     }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');

  //this.Stat();
this.listNotif();
     this.headerTitleService.title.subscribe(updatedTitle => {
       this.title = updatedTitle;
       this.listNotif();

     });
    console.log('isauthenticated');
     this.userNom=this.sessionSotragesevice.get( 'UserNom')+" "+this.sessionSotragesevice.get( 'UserPrenom')
   console.log(this.sessionSotragesevice.get( 'UserPrenom'));

 

  //  var user= JSON.parse(localStorage.getItem('currentUser')|| "");//Pour recuperer une variable localStorage 
 //this.currentUser=user.user[0];

 //get by id super admin
     

}

listNotif(){
  this.Serviceapibackend.getlistordreNotif().subscribe((data: any) => {
    this.ordreintervention = data;
    this.NBordre=Number(data.demande)+Number(data.ordre)+Number(data.intervention);
    console.log('service intervention ')
  console.log(data)
})

}
Stat(){

  this.Serviceapibackend.CountOrdreExceptionBienRecu().subscribe((data: any) => {
    console.log('service intervention ')
  console.log(data)
this.NBordre=data.totalOrdre;
    console.log(data)
  })
  
}

/* get sortData() {
  return this.Ordreintervention.sort((a:any, b:any) => new Date(b.debutprevu).getTime() - new Date(a.debutprevu).getTime());


} */




  ngAfterViewInit(){
     $(document).ready(function  () {


      $("#side-nav").metisMenu();
      Waves.init(); 

      $('.button-menu-mobile').on('click', function (event:any) {
        event.preventDefault();
        $("body").toggleClass("enlarge-menu");
        //alert('acces')
      
        $('.slimscroll').slimscroll({
          height: 'auto',
          position: 'right',
          size: "7px",
          color: '#9ea5ab',
          wheelStep: 5,
          touchScrollStep: 50
      });
    
    });
      
    })


  }
  deconnexion() {
    window.location.reload();

    this.sessionSotragesevice.clear();
    //localStorage.clear();
  
    this.authService.logout().subscribe((superadmin:any) => { 
      this.router.navigate(['/login']); 
      console.log('result service logout ');
      console.log(superadmin);
    });
  }
  


 


}
