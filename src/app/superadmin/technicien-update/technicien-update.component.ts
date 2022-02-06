import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { Technicien } from 'src/app/technicien.model';

@Component({
  selector: 'app-technicien-update',
  templateUrl: './technicien-update.component.html',
  styleUrls: ['./technicien-update.component.css']
})
export class TechnicienUpdateComponent implements OnInit {

  message="";
  id: any;
  technicien:any= Technicien;
  updateTechnicienForm:any= FormGroup;
  Service: any = [];

  constructor(    private Serviceapibackend: BackendApiService,
    private notifyService : NotificationService, 
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                               
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getTechnicien(id).subscribe((data) => {
      console.log(data);
    this.updateTechnicienForm = this.fb.group({
        nom: [data.nom, Validators.required],
        prenom: [data.prenom, Validators.required],
        grade: [data.grade, Validators.required],
        email: [data.email,[Validators.required, Validators.email]],
        tel:[data.tel, Validators.required],
        service:[data.service.id, Validators.required],
        password: [data.password, Validators.required] })
   }) }
  ngOnInit(): void {
    this.readService();

    this.updateForm()
  }
  updateForm(){
    
    this.updateTechnicienForm = this.fb.group({
      nom: [''],
      prenom: [''],
      grade: [''],
      email: [''],
      password: [''],
      tel: [''],
      service: ['']

    })    
  }
  submitForm(){
    if (this.updateTechnicienForm.valid){

    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.updateTechnicienForm.value);
    this.Serviceapibackend.updateTechnicien(id, this.updateTechnicienForm.value).subscribe(data => {
      this.technicien=data;
    //  data.service=data.service.id;

      this.updateTechnicienForm.patchValue(data);  

      console.log(data);
      console.log(this.updateTechnicienForm.value);
      this.message="Technicien was updated";
      this.router.navigate(['/technicien']);
      console.log(data);
      this.notifyService.showSuccess("bien modifier !!","Technicien ")

  })
}
else{
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")


}
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
