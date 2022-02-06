import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intervention } from 'src/app/intervention.model';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-intervention-view',
  templateUrl: './intervention-view.component.html',
  styleUrls: ['./intervention-view.component.css']
})
export class InterventionViewComponent implements OnInit {
  Usertel:string="";
  // Useradresse:string="";
  Userprenom :string="";
  Usernom:string="";
  Useremail:string="";
 intervention:any=Intervention;
 Intervention:any=[];
 id:any;
 Userrole="";
 click : boolean = true;
 ordreintervention:any=Ordreintervention;

  constructor(private sessionSotragesevice:SessionstorageService,private route: ActivatedRoute
    ,private Serviceapibackend: BackendApiService) { }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');

    //this.loadIntervention();
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
  
    this.Usernom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserNom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');

    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getintervention(id).subscribe((data: Intervention) => {
      this.intervention = data; 
      console.log('get intervention by id');

      console.log(data);
     })
     var id = this.route.snapshot.paramMap.get('id');

    this.Serviceapibackend.GetIntervention(id).subscribe((data:Intervention) => {
      this.intervention = data;
      //this.equipement = data;
      console.log('get intervention with  deatils ')
      console.log(this.intervention)
    })
    }
    changeEtat(){
      this.click = !this.click;
      this.ordreintervention=this.route.snapshot.paramMap.get('id');

      this.Serviceapibackend.changeEtat(this.id,'suspendue').subscribe((data:any) => {
        console.log(data) 
        if(data.action){
          console.log(data)
        }
      }) 
    }
    SuspenduAdmin(idDem:string,id:string,idIn:string){
      //this.ordreintervention=this.route.snapshot.paramMap.get('id');

      this.Serviceapibackend.ChangeEtatSuspenduAdmin(id,idDem,idIn,'suspenduAdmin').subscribe((data:any) => {
        alert("suspenduAdmin")
        console.log(data) 
        if(data.action){
          console.log(data)    
        }
      })
    }
}
