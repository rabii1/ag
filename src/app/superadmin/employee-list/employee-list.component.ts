import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
 declare var $:any ;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employee:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
  id:any;
  error="";
  delete:boolean=true;

  constructor(
    private Serviceapibackend: BackendApiService, private headerTitleService: HeaderTitleService,
    private modalService: NgbModal) {
   
   }

  ngOnInit(): void {
    this.loadEmployees()
    this.headerTitleService.setTitle('Employees');console.log('Employee')
   // this.deleteEmployee();


  }
  loadEmployees(){//get list users
  
    return this.Serviceapibackend.getEmployees().subscribe((data: any)=>{
      this.Employee=data;
      console.log(this.Employee);
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

    this.Serviceapibackend.deleteEmployeeFinale(this.id).subscribe((data:any ) =>{
      this.loadEmployees();
      this.modalService.dismissAll()
    })
   
}

triggerModal(content:any,id:any) {
  this.id=id;
  this.error="";
  this.delete=true;
  this.Serviceapibackend.DeleteEmployee(this.id).subscribe((data:any) => {

    if(data.action =="oui")
    {
    this.error ="Voulez-vous vraiment supprimer ces enregistrements ?"
    this.delete=false;
  }
  else {
    this.delete=true;  
    this.error ="Vous n'avez pas le droit de supprimer cette enregistrements"
  }

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  })
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