import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { PiecesRechange } from 'src/app/pieces-rechange.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-update-pieces',
  templateUrl: './update-pieces.component.html',
  styleUrls: ['./update-pieces.component.css']
})
export class UpdatePiecesComponent implements OnInit {
  id: any;
  pieceRechange :any= PiecesRechange;
  updateForm:any= FormGroup;
  progress:number=0;
  selectedFile: any =[];
  message="";
  Fournisseur: any = [];
  url:any='http://127.0.0.1:1337/images/';
  Dataglob:any;
  constructor(private Serviceapibackend: BackendApiService,  private router: Router, 
    public fb: FormBuilder,private notifyService : NotificationService,
    private actRoute: ActivatedRoute ) { 

    }

  ngOnInit(): void {
    this.updatePieceForm();
    this.readFournisseur();

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getPiecesRechangeById(id).subscribe((data) => {
      console.log(data);
      this.Dataglob=data;
      this.url=this.url+data.image;
      this.updateForm = this.fb.group({
                                        // code_PR_utilisee: [data.code_PR_utilisee],
                                        nom_piece: [data.nom_piece, Validators.required],
                                        quantite: [data.quantite, Validators.required],
                                        ref_piece: [data.ref_piece, Validators.required],
                                        marque_piece: [data.marque_piece, Validators.required],
                                        fournisseur: [data.fournisseur, Validators.required],
                                        image: [data.image, Validators.required],
                                      })
   }) 
  
  }
  updatePieceForm(){
    
    this.updateForm = this.fb.group({
      // code_PR_utilisee: [''],
      nom_piece: [''],
      quantite: [''],
      ref_piece: [''],
      fournisseur: [''],
      marque_piece: [''],
      image: [''],
      

    })    
  }
  submit(){
    if (this.updateForm.valid) {
    console.log("this.selectedFile[0]")
    console.log(this.selectedFile)
    if (this.selectedFile.length == 0) {
    let  dtx ={
   
      //  "code_PR_utilisee":this.updateForm.value.libelle,
       "nom_piece":this.updateForm.value.nom_piece, 
       "marque_piece":this.updateForm.value.marque_piece,
       "quantite":this.updateForm.value.quantite,
       "fournisseur":this.updateForm.value.fournisseur,
       "ref_piece":this.updateForm.value.ref_piece,
       image:this.Dataglob.image,
   
     }
     var id = this.actRoute.snapshot.paramMap.get('id');
     console.log(this.updateForm.value);

     this.Serviceapibackend.updatePiecesRechange(id,dtx).subscribe(data => {
       this.pieceRechange=data;
       console.log('tttttttttttttest1');
       console.log(data);
       this.updateForm.patchValue(data); 
       console.log('tttttttttttttest222');

       //console.log(this.updatePieceForm);
       this.message="piéces was updated";
       this.router.navigate(['/list-Pieces']);
       console.log(data);
       this.notifyService.showSuccess(" Bien modifier ","Piece rechange")


     })

    }else{
      const file: File  = this.selectedFile[0];
      var formPost: any = new FormData();
      let  dtx ={
   
        // "code_PR_utilisee":this.updateForm.value.code_PR_utilisee,
        "nom_piece":this.updateForm.value.nom_piece, 
        "marque_piece":this.updateForm.value.marque_piece,
        "quantite":this.updateForm.value.quantite,
        "fournisseur":this.updateForm.value.fournisseur,
        "ref_piece":this.updateForm.value.ref_piece,
        image:'',
    
      }
     console.log(dtx)
     formPost.append('file', file);
   
   
  
  
  
  
    this.Serviceapibackend.upload( formPost).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress)
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log(this.message)
          console.log('image Piece uploaded successfully!');
          dtx.image=event.body.fileName
          //this.updateForm.setValue();
          //this.updateForm.patchValue({image:event});
          //dtx.image=event.body.fileName.patchValue;
          var id = this.actRoute.snapshot.paramMap.get('id');
          console.log(this.updateForm.value);
     
          this.Serviceapibackend.updatePiecesRechange(id, dtx).subscribe(data => {
            this.pieceRechange=data;
        
            this.updateForm.patchValue(data); 
            console.log(data);
            //console.log(this.updatePieceForm);
            this.message="piéces was updated";
            this.router.navigate(['/list-Pieces']);
            console.log(data);
            this.notifyService.showSuccess(" Bien modifier ","Piéce rechange")

     
          })
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
}
else  {
this.notifyService.showDanger("erreur  !!","verifier les champs vide")

}
  }
  onFileChange(event:any) {

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        console.log(filesAmount)
        console.log(event.target.files)
        this.selectedFile=event.target.files;   
        //this.updateForm.controls['file'].setValue(event.target.files)
        console.log(this.updateForm.value);
        //this.updateForm.patchValue({filesAmount:event.target.files[0]});
        //this.updateForm.get('image').patchValue(filesAmount.result );

         };
    }
     //getFournisseur
 readFournisseur() {

  this.Serviceapibackend.AllFournisseur().subscribe((data: {}) => {
    this.Fournisseur = data;
    console.log('service Fournisseur')
    console.log(this.Fournisseur)
  })
}
}
