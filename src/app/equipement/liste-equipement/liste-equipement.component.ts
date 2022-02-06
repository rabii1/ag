import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-liste-equipement',
  templateUrl: './liste-equipement.component.html',
  styleUrls: ['./liste-equipement.component.css']
})
export class ListeEquipementComponent implements OnInit {
  Equipement:any ;
  Etatequipement:any=[];
  etatequipement:any
  SearchTerm:any;
  public searchFilter: any = '';
  closeModal:any ;
  id:any;
  imageSrc:any;
  term:any;
  public filter: any = '';
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [ 6, 9, 12];
  Userrole="";
  error="";
  delete:boolean=true;
  constructor(private sessionSotragesevice:SessionstorageService,private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle(' Equipement');console.log('Equipement')
    this.Userrole = this.sessionSotragesevice.get('UserRole');

    this.loadEquipement();
    this.loadEtatEquipement();
  }
  loadEquipement(){
    this.Serviceapibackend.AllEquipement().subscribe((data:any) => {
      console.log("checj +++++++++++++")
      console.log(data);
      
      let listfinale=data.map((el:any) => {

        var etatactuelle=el.etatequipements.filter( (elx:any) =>  elx.status=="actuelle")
        console.log(etatactuelle)
         el.etatact=etatactuelle[0].nometat
          return el;
          
      })
      console.log(listfinale)
      this.Equipement = listfinale;
    console.log(this.Equipement)


      console.log('service equipement')
      console.log(listfinale)
   
    })
  }
  deleteEquipement(){
    this.Serviceapibackend.deleteEquipement(this.id).subscribe((data:any )=> {
      this.loadEquipement();
      this.modalService.dismissAll()
    })  


   

}

triggerModal(content:any,id:any) {
  this.id=id;
  this.delete=true;
  this.error ="";

  this.Serviceapibackend.deleteEquipementWithCondition(this.id).subscribe((data:any )=> {
    this.loadEquipement()
    if(data.action=="oui"){
      this.error ="Voulez-vous vraiment supprimer ces enregistrements"
      this.delete=false;
    }
    else {
      this.delete=true;
      this.error ="Vous n'avez pas le droit de supprimer cette Equipement"
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
onTableDataChange(event:any){
  this.page = event;
  this.loadEquipement();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.loadEquipement();
}

loadEtatEquipement(){
  this.Serviceapibackend.AllEtatequipement().subscribe((data: any) => {
    this.Etatequipement = data;
    console.log(data)
    console.log('service Etatequipement')
 
  })
}

get sortData() {
  return this.Equipement.sort((a:any, b:any) => new Date(b.date_en_service).getTime() - new Date(a.date_en_service).getTime());

}
}
