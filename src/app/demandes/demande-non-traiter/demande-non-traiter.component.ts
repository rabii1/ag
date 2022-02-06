import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { DatePipe } from '@angular/common';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-demande-non-traiter',
  templateUrl: './demande-non-traiter.component.html',
  styleUrls: ['./demande-non-traiter.component.css']
})
export class DemandeNonTraiterComponent implements OnInit {
  status:any;
  Demandeintervention:any=[];
  Employee: any = [];
  Ordreintervention: any = [];
  Equipement: any = [];
  Min:any;
  Max:any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [ 6, 9, 12];
  Userrole:string="";
  click : boolean = true;
  constructor( private notifyService : NotificationService, private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private sessionSotragesevice:SessionstorageService) { }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.headerTitleService.setTitle('  DEMANDE NON TRAITE ');console.log(' Demande non traité')

    this.loadDemandeintervention();
    this.readOrdre();
    this.readEmployee();
    this.readEquipement();
  }
  loadDemandeintervention(){
    this.Serviceapibackend.getListDemandeInterventionNonAffected().subscribe((data:any) => {
      this.Demandeintervention = data.demandeintervention;
  
      console.log('service de demande non traité afficher')
      console.log(this.Demandeintervention)
   
    })
  }
  onButtonClick(){
    this.click = !this.click;}
  get sortData() {
   return this.Demandeintervention.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // return this.Demandeintervention.sort((a:any, b:any) => {
    //   return <any>new Date(b.date) - <any>new Date(a.date);
     
    // });
  }
  readOrdre(){
    this.Serviceapibackend.getOrdre().subscribe((data: {}) => {
      this.Ordreintervention = data;
      console.log('service ordre')
      //alert('service ordre chbik matemchich :( ')
  
      console.log(this.Ordreintervention)
    })
  
  }
  readEquipement(){
    this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
      this.Equipement = data;
      console.log('service equiement')
  
      console.log(this.Equipement)
    })
  
  }
  readEmployee(){
    
  this.Serviceapibackend.getEmployees().subscribe((data: {}) => {
    this.Employee = data;
    console.log('service employee')
    console.log(this.Employee)
  })
  }
  // format date in typescript
 getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-Tn');
  return datePipe.transform(date, format);
} 


onTableDataChange(event:any){
  this.page = event;
  //this.loadDemandeintervention();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}  


resolu(idDem:string,id:string,equipement:string){
  ///this.form.value.demandeintervention=this.route.snapshot.paramMap.get('id');
  console.log(this.Demandeintervention)
  alert( idDem +' - '+id+' - '+equipement)
  this.Serviceapibackend.UpdateEtatResolu(idDem,id,'cloturer',equipement).subscribe((data:any) => {
   alert("cloturer")
    console.log(data) 
    if(data.action){
      this.notifyService.showSuccess("","MARQUE COMME RESOLU");
      
      console.log(data)

    }
  })
}
}

