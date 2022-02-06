import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-create-pieces',
  templateUrl: './create-pieces.component.html',
  styleUrls: ['./create-pieces.component.css']
})
export class CreatePiecesComponent implements OnInit {
  Fournisseur: any = [];
  form:any= FormGroup;
  submitted = false;
  selectedFile : any;
  progress: number=0;
  message: any;
  constructor(private fb: FormBuilder,
    private Serviceapibackend: BackendApiService,  private notifyService : NotificationService,
    private router: Router,private formBuilder: FormBuilder) { 
     
    }
    

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      // code_PR_utilisee: ['', Validators.required],
      nom_piece: ['', Validators.required],
      quantite: ['', Validators.required],
      ref_piece: ['', [Validators.required]],
      marque_piece: ['', Validators.required],
      image: ['', Validators.required],
      fournisseur: ['', Validators.required],
  },
  );
  this.readFournisseur();
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

submit() {
  if (this.form.valid) {
  const file: File  = this.selectedFile[0];
  var formPost: any = new FormData();
  var  dtx ={
 
    //  "code_PR_utilisee":this.form.value.code_PR_utilisee,
     "nom_piece":this.form.value.nom_piece, 
     "quantite":this.form.value.quantite,
     "ref_piece":this.form.value.ref_piece,
     "fournisseur":this.form.value.fournisseur,
     "marque_piece":this.form.value.marque_piece,
     image:''
 
   }
   console.log(dtx)
   formPost.append('file', file);
 // formPost.set("datax",JSON.stringify(dtx));
 
 




  this.Serviceapibackend.Upload( formPost).subscribe(
    (event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress)
      } else if (event instanceof HttpResponse) {
        this.message = event.body.message;
        console.log(this.message)
        console.log('image Piece rechange uploaded successfully!');
        dtx.image=event.body.fileName

        this.Serviceapibackend.createPiecesRechange(dtx).subscribe(res => {
          this.notifyService.showSuccess("Pieces   !!","bien crée")
          this.router.navigate(['/list-Pieces'])

        })

       // this.router.navigate(['/list-equipement'])
       }
       else {
      
        console.log(this.form)
    }
    },
    (err: any) => {
 
      console.log(err);
      this.progress = 0;

      if (err.error && err.error.message) {
        this.message = err.error.message;
         this.notifyService.showDanger("erreur  !!","problém upload ! check again !")

      } else {
        this.message = 'Could not upload the file!';
       this.notifyService.showDanger("erreur  !!","problém upload ! check again !")
      }

    
    });

  } 
 else  {
    this.notifyService.showDanger("erreur  !!","verifier les champs vide")
  }


}
 //getFournisseur
 readFournisseur() {

  this.Serviceapibackend.AllFournisseur().subscribe((data: {}) => {
    this.Fournisseur = data;
    console.log('service Fournisseur')
    console.log(this.Fournisseur)
  })
}
onFileChange(event:any) {

  if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      console.log(filesAmount)
      console.log(event.target.files)
      this.selectedFile=event.target.files;   
       };
  }
}
