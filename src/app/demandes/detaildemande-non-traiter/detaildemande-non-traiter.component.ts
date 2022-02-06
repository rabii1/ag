import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Employee } from 'src/app/employee.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-detaildemande-non-traiter',
  templateUrl: './detaildemande-non-traiter.component.html',
  styleUrls: ['./detaildemande-non-traiter.component.css']
})
export class DetaildemandeNonTraiterComponent implements OnInit {

  Usertel:string="";
  Useradresse:string="";
  Userprenom :string="";
  Usernom:string="";
  Useremail:string="";
  id:any;
  demandeIntervention:any;
  employee:any=Employee;
  Demandeintervention:any=[];
  constructor(     private route: ActivatedRoute,private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService) { }

  ngOnInit(): void {
 
this.loadDemandeintervention();
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.Usernom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserNom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');



    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getDemandeintervention(id).subscribe((data: Demandeintervention) => {
      this.demandeIntervention = data; 

      data.ordreinterventions=data.ordreinterventions;
 

      console.log('get demande by id');

      console.log(data);
     })
  }

  loadDemandeintervention(){

    this.Serviceapibackend.getinterventions().subscribe((data: {}) => {
      this.Demandeintervention = data;
      console.log('service intervention demande')
      console.log(data)
    })
  }



}
