import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  Admin:any=[]
  dtOptions: DataTables.Settings = {};
  closeModal:any ;
id:any;
  constructor( 
    private Serviceapibackend: BackendApiService, private headerTitleService: HeaderTitleService,
    // private Adminservice: AdminService,
    private modalService: NgbModal) {
    this.loadAdmins();
   }

  ngOnInit(): void {
 
   
    this.headerTitleService.setTitle('Admins');console.log('admin')


  }
  loadAdmins(){//get list users
  
    return this.Serviceapibackend.getAdmins().subscribe((data: any)=>{
      this.Admin=data;
      console.log(this.Admin);
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
    this.Serviceapibackend.deleteAdmin(this.id).subscribe(data => {
      this.loadAdmins()
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
