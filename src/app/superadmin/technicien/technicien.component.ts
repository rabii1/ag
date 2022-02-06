import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {

  Technicien:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
  id:any;
  error=""; 
  delete:boolean=true;
 
  constructor( private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,

    //  private Technicienservice: TechnicienService,
     private modalService: NgbModal) {
   }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Techniciens');console.log('tech')
    this.loadEmployees();

   


  }
  loadEmployees(){//get list users
  
    return this.Serviceapibackend.getTechniciens().subscribe((data: any)=>{
      this.Technicien=data;
      console.log(this.Technicien);
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
  
  
    }); 
}
deleteEmployee(){
  
  this.Serviceapibackend.DeleteTechnicienFinal(this.id).subscribe((data:any) => {
    //  this.loadEmployees();
  this.loadEmployees();
    this.modalService.dismissAll()
  
  })  

}
  
triggerModal(content:any,id:any) {
  this.id=id;
  this.error="";
  this.delete=true;
  
  this.Serviceapibackend.DeleteTechnicien(this.id).subscribe((data:any) => {
  //  this.loadEmployees();
    
  if(data.action =="oui"){

    this.error ="Voulez-vous vraiment supprimer ces enregistrements ?"
    this.delete=false;
  //  this.modalService.dismissAll('done')
    
  }else  {

    this.delete=true;  
    this.error ="Vous n'avez pas le droit de supprimer cette enregistrements"
  //  this.modalService.dismissAll('done')
  }
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;

  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
   
  });


  })

 
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
