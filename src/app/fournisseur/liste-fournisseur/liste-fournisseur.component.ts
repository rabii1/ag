import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-liste-fournisseur',
  templateUrl: './liste-fournisseur.component.html',
  styleUrls: ['./liste-fournisseur.component.css']
})
export class ListeFournisseurComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
  id:any;
  Fournisseur:any=[];
  error="";
  error1="";
  delete:boolean=true;
 // Userrole="";

  constructor(private sessionSotragesevice:SessionstorageService,private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    //this.Userrole = this.sessionSotragesevice.get('UserRole');

    this.loadEquipement();
    //this.deleteFournisseur();
    this.headerTitleService.setTitle('Fournisseurs');console.log('forni')

  }
  loadEquipement(){
    this.Serviceapibackend.AllFournisseur().subscribe((data:any) => {
      this.Fournisseur = data;
  
      console.log('service Fournisseur')
      console.log(this.Fournisseur)
      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
      } );
      }, 1);
   
    })
  }

  deleteFournisseur(){
     //  console.log(this.Fournisseur.length)
     this.Serviceapibackend.deleteFournisseurFinale(this.id).subscribe((data:any) => {
     this.loadEquipement()
     this.modalService.dismissAll()
    })
      
}
  
triggerModal(content:any,id:any) {
  this.id=id;
  this.error="";
  this.delete=true;

  this.Serviceapibackend.deletefournisseur(this.id).subscribe((data:any) => {
    console.log(data)
  if(data.action=="oui"){
    this.error ="Voulez-vous vraiment supprimer ces enregistrements"
    this.delete=false;
  }
 else {
  this.delete=true;
  this.error ="Vous n'avez pas le droit de supprimer cette enregistrements"
 }
 })
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
