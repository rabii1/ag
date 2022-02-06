import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-view-ordre-intervention',
  templateUrl: './view-ordre-intervention.component.html',
  styleUrls: ['./view-ordre-intervention.component.css']
})
export class ViewOrdreInterventionComponent implements OnInit {
  Ordreintervention:any=[];
  ordreintervention:any=Ordreintervention;
  closeModal:any ;
   id:any;
  constructor(private sessionSotragesevice:SessionstorageService,private route: ActivatedRoute
    ,private Serviceapibackend: BackendApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
   
    var id = this.route.snapshot.paramMap.get('id');
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
