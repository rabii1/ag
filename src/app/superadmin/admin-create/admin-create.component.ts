import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  @Input() UserDetails = { nom: '',prenom:'', email: '', password: '',adresse:'',tel:''  }

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
      password: [null, [Validators.required,Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
  },
  );
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  console.log(this.form.value);
  if (this.form.valid){
  this.Serviceapibackend.createAdmin(this.form.value).subscribe(res => {
       console.log('admin created successfully!');
       this.router.navigate(['/admin'])
       this.notifyService.showSuccess("Admin  !!","bien crée")

      })
    }
    else{
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")


    }
}

}
