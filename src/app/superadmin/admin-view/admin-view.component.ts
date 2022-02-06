import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/admin.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  id: any;
  admin :any= Admin;
   
  constructor(
    private Serviceapibackend: BackendApiService,
    // private Adminservice:AdminService,
    private router: Router, 
    private route: ActivatedRoute,
   ) {  
    
    }
  
  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getAdmin(id).subscribe((data: Admin) => {
      console.log(data);
      this.admin = data;  })
    // this.id = this.route.snapshot.params['id'];
      
    // this.Employeeservice.getEmployee(this.id).subscribe((data: Employee)=>{  });
    
  
  }


}
