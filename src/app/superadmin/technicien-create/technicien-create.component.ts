import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-technicien-create',
  templateUrl: './technicien-create.component.html',
  styleUrls: ['./technicien-create.component.css']
})
export class TechnicienCreateComponent implements OnInit {
  Service: any = [];

  @Input() UserDetails = { nom: '',prenom:'', email: '', password: '' ,grade:'',tel:''}

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel:['', Validators.required],
      grade: ['', Validators.required],
      service: ['', Validators.required],
      password: [null, [Validators.required,Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
  },
  );
  this.readService();
  }


// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  if (this.form.valid){
  console.log(this.form.value);
  this.Serviceapibackend.createTechnicien(this.form.value).subscribe(res => {
       console.log('Technicien created successfully!');
       this.router.navigate(['/technicien'])
       this.notifyService.showSuccess(" Bien crée ","Technicien")

      })
}
else{
  console.log(this.form.valid);
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")
}
}
//get all service
readService() {

  this.Serviceapibackend.AllService().subscribe((data: {}) => {
    this.Service = data;
    console.log('service Service')
    console.log(this.Service)
    //this.notifyService.showSuccess("Intervention  !!","bien crée")

  })
}

}
