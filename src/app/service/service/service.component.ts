import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  Service:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
  id:any;
  error=""; 
  delete:boolean=true;
  constructor( 
    private Serviceapibackend: BackendApiService, private headerTitleService: HeaderTitleService,
    // private Adminservice: AdminService,
    private modalService: NgbModal) {
    this.loadService();
   }

  ngOnInit(): void {
 
   
    this.headerTitleService.setTitle('Service');console.log('Service')


  }
  loadService(){//get list users
  
    return this.Serviceapibackend.AllService().subscribe((data: any)=>{
      this.Service=data;
      console.log(this.Service);
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
deleteService(){

this.Serviceapibackend.deleteService(this.id).subscribe((data:any) => {
this.loadService();
this.modalService.dismissAll()
  })

}
  
triggerModal(content:any,id:any) {
  this.id=id;
  this.error="";
  this.delete=true;


    this.Serviceapibackend.deleteServicerWithequipementNoPermitted(this.id).subscribe((data:any) => {
      if(data.action =="oui"){
      this.error ="Voulez-vous vraiment supprimer ces enregistrements ?"
      this.delete=false;
    }
  else{
    this.delete=true;
      this.error ="Vous n'avez pas le droit de supprimer cette enregistrements"
  }
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
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
