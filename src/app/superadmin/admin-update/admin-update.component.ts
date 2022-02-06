import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/admin.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {

 
  message="";
  id: any;
  admin:any= Admin;
  updateEmployeeForm:any= FormGroup;

  constructor( 
    // private Adminservice:AdminService,
    private Serviceapibackend: BackendApiService,
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                  
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getAdmin(id).subscribe((data) => {
      console.log(data);
    this.updateEmployeeForm = this.fb.group({
        nom: [data.nom],
        prenom: [data.prenom],
        email: [data.email],
        adresse: [data.adresse],
        tel: [data.tel],
        password: [data.password] })
   }) }
  ngOnInit(): void {
    this.updateForm()
  }
  updateForm(){
    
    this.updateEmployeeForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],
     


    })    
  }
  submitForm(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.updateEmployeeForm.value);
    this.Serviceapibackend.updateAdmin(id, this.updateEmployeeForm.value).subscribe(data => {
      this.admin=data;
      console.log(data);
      console.log(this.updateEmployeeForm.value);
      this.message="Admin was updated";
      this.router.navigate(['/admins']);
      console.log(data);
  })

}

}
