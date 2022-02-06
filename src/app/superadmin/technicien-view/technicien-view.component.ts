import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Technicien } from 'src/app/technicien.model';

@Component({
  selector: 'app-technicien-view',
  templateUrl: './technicien-view.component.html',
  styleUrls: ['./technicien-view.component.css']
})
export class TechnicienViewComponent implements OnInit {
  Service:any=[]
  id: any;
  technicien:any= Technicien;
   
  constructor(
    private Serviceapibackend: BackendApiService, 
       // private Technicienservice:TechnicienService,
    private router: Router, 
    private route: ActivatedRoute,
   ) {  
    
    }
  
  ngOnInit(): void {
    this.readService();
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getTechnicien(id).subscribe((data: Technicien) => {
      console.log(data);
      this.technicien = data;  })
    // this.id = this.route.snapshot.params['id'];
      
    // this.Employeeservice.getEmployee(this.id).subscribe((data: Employee)=>{  });
    
  
  }

//get all service
readService() {

  this.Serviceapibackend.AllService().subscribe((data: {}) => {
    this.Service = data;
    console.log('service Service')
    console.log(this.Service)
  })
}
}
