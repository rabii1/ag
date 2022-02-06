import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-ordre-traite',
  templateUrl: './ordre-traite.component.html',
  styleUrls: ['./ordre-traite.component.css']
})
export class OrdreTraiteComponent implements OnInit {
  ordreintervention:any;
  Ordreintervention:any=[];
  Min:any;
  Max:any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [3, 6, 9, 12];
  id:any;
  closeModal:any ;
  Usertel:string="";
  Useradresse:string="";
  constructor(private headerTitleService: HeaderTitleService,private route: ActivatedRoute,private modalService: NgbModal,private Serviceapibackend: BackendApiService,private sessionSotragesevice:SessionstorageService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle(' Ordre Traité');console.log('Ordre Traité')
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
  

    this.id = this.sessionSotragesevice.get('UserId');
    console.log(this.id)
    this.loadOrdreInterventionTraite();
  }

  loadOrdreInterventionTraite(){
    this.Serviceapibackend.getListOrdreInterventionTraite(this.id).subscribe((data:{}) => {
      this.Ordreintervention = data
     
      console.log('service Ordreintervention Non affected')
      console.log(this.Ordreintervention)
     
    })
  }
    // format date in typescript
 getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-Tn');
  return datePipe.transform(date, format);
} 
 
onTableDataChange(event:any){
  this.page = event;
  this.loadOrdreInterventionTraite();
}  
onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.loadOrdreInterventionTraite();
}  

get sortData() {
  return this.Ordreintervention.sort((a:any, b:any) => new Date(b.debutprevu).getTime() - new Date(a.debutprevu).getTime());

  // return this.Ordreintervention.sort((a:any, b:any) => {
  //   return <any>new Date(b.date) - <any>new Date(a.date);
   
  // });
}

  triggerModalView(content:any,id:any) {
    this.id=id;
    console.log("msggggg")
    //var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getOrdreintervention(id).subscribe((data: Ordreintervention) => {
      this.ordreintervention = data; 
     // this.ordreintervention = data.demandeinterventions;
      data.demandeintervention=data.demandeintervention;
 
      // data.equipement=data.equipement;
      //data.techniciens=data.techniciens;
      data.intervention=data.intervention;

      console.log('get Ordreintervention by id');

      console.log(data);
     }) 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass"}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
 
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
    obj(id: any, obj: any) {
      throw new Error('Method not implemented.');
    }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
