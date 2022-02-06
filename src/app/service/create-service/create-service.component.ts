import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  form:any= FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private notifyService : NotificationService,
        private Serviceapibackend: BackendApiService,

    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      nom_service: ['', Validators.required],
  
  },
  );
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  console.log(this.form.value);
  if (this.form.valid){
  this.Serviceapibackend.createService(this.form.value).subscribe(res => {
       console.log('service created successfully!');
       this.router.navigate(['/service']);
       this.notifyService.showSuccess("Service  !!","bien crée")

      })
    }
      else{
        this.notifyService.showDanger("erreur  !!","verifier les champs vide")
  
  
      }
}

}
