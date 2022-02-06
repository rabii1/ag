import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-demandeintervention-view',
  templateUrl: './demandeintervention-view.component.html',
  styleUrls: ['./demandeintervention-view.component.css']
})
export class DemandeinterventionViewComponent implements OnInit {
  Demandeintervention:any=[];
  Employee: any = [];
  Ordreintervention: any = [];
  closeModal:any ;
  id:any;
  //ordreinterventions:any=Ordreintervention;

  constructor(private Serviceapibackend: BackendApiService
    ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.  loadDemandeintervention();
    this.readOrdre();
    this.readEmployee();
  }

  loadDemandeintervention(){

  this.Serviceapibackend.getDemandeinterventions().subscribe((data: {}) => {
    this.Demandeintervention = data;

    console.log('service intervention demande')
    console.log(this.Demandeintervention)
  })
}
//getEmployee
readEmployee() {

  this.Serviceapibackend.getEmployees().subscribe((data: {}) => {
    this.Employee = data;
    console.log('service employee')
    console.log(this.Employee)
  })
}
//get all ordre intervention
readOrdre() {
  this.Serviceapibackend.getOrdre().subscribe((data: {}) => {
    this.Ordreintervention = data;
    console.log('service ordre')
    //alert('service ordre chbik matemchich :( ')

    console.log(this.Ordreintervention)
  })


}
deleteDemande(){
  this.Serviceapibackend.deleteDemande(this.id).subscribe(data => {
    this.loadDemandeintervention()
  })

}
triggerModal(content:any,id:any) {
  this.id=id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
