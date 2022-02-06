import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Employee } from 'src/app/employee.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { DatePipe } from '@angular/common';
import { Ordreintervention } from 'src/app/ordreintervention.model';

@Component({
  selector: 'app-demandeintervention-list',
  templateUrl: './demandeintervention-list.component.html',
  styleUrls: ['./demandeintervention-list.component.css']
})
export class DemandeinterventionListComponent implements OnInit {
  Usertel:string="";
  Useradresse:string="";
  Userprenom :string="";
  Usernom:string="";
  Useremail:string="";
  Userrole="";
  id:any;
  demandeIntervention:any=Demandeintervention
  employee:any=Employee;
  Demandeintervention:any=[];
  click : boolean = true;
  demandeintervention:any=Demandeintervention;
  constructor(    private route: ActivatedRoute,private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService) { }

  ngOnInit(): void {
 
//this.loadDemandeintervention();
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.Usernom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserNom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel');
    


    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getDemandeintervention(id).subscribe((data: Demandeintervention) => {
      this.demandeIntervention = data; 
      this.Demandeintervention = data.equipement;
      this.Demandeintervention = data.employee;;


      //data.ordreinterventions=data.ordreinterventions;
 

      console.log('get demande by id');

      console.log(data);
     })
  }
   // format date in typescript
 getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-Tn');
  return datePipe.transform(date, format);
}
/* 
  loadDemandeintervention(){

    this.Serviceapibackend.getinterventions().subscribe((data: any) => {
      this.Demandeintervention = data;

      console.log('service intervention demande')
      console.log(data)
    })
  } */
  // changeEtat(){
  //   this.click = !this.click;
  //   this.demandeintervention=this.route.snapshot.paramMap.get('id');

  //   this.Serviceapibackend.updateEtat(this.id,'reinialiser').subscribe((data:any) => {
  //     alert("reinialiser")
  //     console.log(data) 
  //     if(data.action){
  //       console.log(data)
       
  
  //     }
  //   }) 
  // }
}
