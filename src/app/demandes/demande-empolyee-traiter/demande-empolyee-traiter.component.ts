import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-demande-empolyee-traiter',
  templateUrl: './demande-empolyee-traiter.component.html',
  styleUrls: ['./demande-empolyee-traiter.component.css']
})
export class DemandeEmpolyeeTraiterComponent implements OnInit {
  
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
  id:any;
  constructor(private headerTitleService: HeaderTitleService,private sessionSotragesevice:SessionstorageService,
    private Serviceapibackend: BackendApiService,) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('  Demande non traiter ');console.log('Suivi demandes ')

    this.id = this.sessionSotragesevice.get('UserId');
    console.log(this.id)
    this.loadDemandeintervention();
    this.readOrdre();
    this.readEmployee();
    this.readEquipement();
  }
  loadDemandeintervention(){
    this.Serviceapibackend.getDemandeNontraiteSelonEmployeeConnected(this.id).subscribe((data:{}) => {
      this.Demandeintervention = data;
  
      console.log('service de demande non traité afficher')
      console.log(this.Demandeintervention)
   
    })
  }
  get sortData() {
    return this.Demandeintervention.sort((a:any, b:any) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
     
    });}
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
      console.log('service ordre')
  
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


}
