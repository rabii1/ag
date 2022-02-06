import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Demandepiece } from 'src/app/demandepiece.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
id:any; 
demandepiece:any=Demandepiece;
closeModal:any ;
  Demandepiece :any=[];
  Intervention:any=[]
  intervention:any
  Usertel:string="";
  list:any=[];
  tableSize = 6;
  tableSizes = [ 3, 6, 12];
  page = 1;
  count = 0;
  constructor(private modalService: NgbModal, private headerTitleService: HeaderTitleService ,private actRoute: ActivatedRoute, private notifyService : NotificationService,private route: ActivatedRoute,
    private router: Router,private formBuilder: FormBuilder,
    private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService,) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('  Demande des piéces');console.log('Demande des piéces')
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;

this.AllEtatattendPieces();



}
onTableDataChange(event:any){
  this.page = event;
  this.AllEtatattendPieces();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.AllEtatattendPieces();
}

AllEtatattendPieces(){
  return this.Serviceapibackend.getDemandeGroupbyIn().subscribe((data: any)=>{
    this.Demandepiece=data;
    
    console.log(data);
  }); 
}
   // format date in typescript
   getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-Tn');
    return datePipe.transform(date, format);
  }  
  get sortData() {
    return this.Demandepiece.sort((a:any, b:any) => new Date(b.intervention.date_debut).getTime() - new Date(a.intervention.date_debut).getTime());
  }
}
