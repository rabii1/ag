import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employee.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  id: any;
  employee :any= Employee;
   
  constructor(
    private Serviceapibackend: BackendApiService,
    // private Employeeservice:EmployeeService,
    private router: Router, 
    private route: ActivatedRoute,
   ) {  
    
    }
  
  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getEmployee(id).subscribe((data: Employee) => {
      console.log(data);
      this.employee = data;  })
    // this.id = this.route.snapshot.params['id'];
      
    // this.Employeeservice.getEmployee(this.id).subscribe((data: Employee)=>{  });
    
  
  }

}
