import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/fournisseur.model';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {
 
  message="";
  id: any;
  fournisseur:any= Fournisseur;
  Updateform:any= FormGroup;
  form:any= FormGroup;

  constructor( private fb: FormBuilder,private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,
    private router: Router,private formBuilder: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                  
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getFournisseurById(id).subscribe((data) => {
      console.log(data);
    this.Updateform = this.fb.group({
        nom: [data.nom],
        prenom: [data.prenom],
        email: [data.email],
        adresse: [data.adresse],
        tel: [data.tel],
        password: [data.password],
        // code_fournisseur: [data.code_fournisseur],
       })
   }) }
  ngOnInit(): void {
    this.form= this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      // code_fournisseur: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      password: [null, [Validators.required,Validators.minLength(8)]],

      // password['',Validators.required],
  },
  );
    this.updateForm()
  }
  updateForm(){
    
    this.Updateform = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],
      // code_fournisseur:['']
     


    })    
  }
  get f() { return this.form.controls; }

  submit(){
    if (this.form.valid){

    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.Updateform.value);
    this.Serviceapibackend.updateFournisseur(id, this.Updateform.value).subscribe(data => {
      this.fournisseur=data;
      console.log(data);
      console.log(this.Updateform.value);
      this.message="fournisseur was updated";
      this.router.navigate(['/list-Fournisseur']);
      console.log(data);
      this.notifyService.showSuccess("Bien modifier  !!","Fournisseur")

  })
    }
    else{
      console.log(this.form.valid);
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")
    }
}




}
