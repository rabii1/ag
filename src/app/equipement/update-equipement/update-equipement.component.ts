import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipement } from 'src/app/equipement.model';
import { NotificationService } from 'src/app/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-update-equipement',
  templateUrl: './update-equipement.component.html',
  styleUrls: ['./update-equipement.component.css']
})
export class UpdateEquipementComponent implements OnInit {
  Equipement:any=[];
  Service:any = [];
  message="";
  id: any;
  equipement:any= Equipement;
  updateForm:any= FormGroup;
  //EtatequipementStat:any=["En panne","Sous maintien","En marche","hors service"];
  Etatequipement:any=[]
  progress:number=0;
  selectedFile : any =[];
  DataGlob:any;
  url:any='http://backgmao-sirin.146.59.159.175.nip.io/images/';
  minDate:any;
  constructor( private Serviceapibackend: BackendApiService,private notifyService : NotificationService,
                private router: Router, 
                public fb: FormBuilder,
                private actRoute: ActivatedRoute) 
                {

                  
     }
  ngOnInit(): void {
   
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8); 

    this.updatePieceForm();
    this.readEtatEquipement();
    this.readService();


    var id = this.actRoute.snapshot.paramMap.get('id');
    this.Serviceapibackend.getEquipementById(id).subscribe((data) => {
      //alert("appel")
      console.log(data);
      this.DataGlob=data;
      this.url=this.url+data.image;

    this.updateForm = this.fb.group({
      libelle: [data.libelle, Validators.required],
      numero_model: [data.numero_model, Validators.required],
      numero_serie: [data.numero_serie, Validators.required],
      marque: [data.marque, Validators.required],
      // duree_en_service: [data.duree_en_service],
      date_en_service: [data.date_en_service, Validators.required],
      etatequipements: [data.etatequipements[0].id, Validators.required],
      service: [data.service.id, Validators.required],
      image: [data.image, Validators.required],
      date_hors_service: [data.date_hors_service] })
   })
  }
  updatePieceForm(){
    
    this.updateForm = this.fb.group({
      libelle: [''],
      numero_model: [''],
      numero_serie: [''],
      marque: [''],
      // duree_en_service: [''],
      date_en_service: [''],
      etatequipements: [''],
      service: [''],
      date_hors_service: [''],
      image: [''],
     


    })    
  }
  submit(){
  // if (this.updateForm.valid) {
console.log("this.selectedFile[0]")
console.log(this.selectedFile)
if (this.selectedFile.length == 0) {

  let  dtx ={
   
    "libelle":this.updateForm.value.libelle,
    "numero_model":this.updateForm.value.numero_model, 
    "marque":this.updateForm.value.marque,
    "duree_en_service":this.updateForm.value.duree_en_service,
    "date_en_service":this.updateForm.value.date_en_service,
    "date_hors_service":this.updateForm.value.date_hors_service,
    "service":this.updateForm.value.service,
    "etatequipements":this.updateForm.value.etatequipements,
    "intervention":this.updateForm.value.intervention,
    "numero_serie":this.updateForm.value.numero_serie,
    image:this.DataGlob.image,
  }
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.updateForm.value);
  this.Serviceapibackend.updateEquipement(id,dtx).subscribe(data => {
    this.equipement=data;
    console.log('tttttttttttttest1');
   
    console.log(data);

    this.updateForm.patchValue(data);
    console.log('tttttttttttttest222');

    //console.log(this.updatePieceForm);
    this.message="Equipement was updated";
    this.router.navigate(['/list-equipement']);
    console.log(data);
    //this.notifyService.showSuccess(" Bien modifier ","Equipement")


  })

}else {
  const file: File  = this.selectedFile[0];
    var formPost: any = new FormData();
    let  dtx ={
   
       "libelle":this.updateForm.value.libelle,
       "numero_model":this.updateForm.value.numero_model, 
       "marque":this.updateForm.value.marque,
       "duree_en_service":this.updateForm.value.duree_en_service,
       "date_en_service":this.updateForm.value.date_en_service,
       "date_hors_service":this.updateForm.value.date_hors_service,
       "service":this.updateForm.value.service,
       "etatequipements":this.updateForm.value.etatequipements,
       "intervention":this.updateForm.value.intervention,
       "numero_serie":this.updateForm.value.numero_serie,
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
          console.log('image equipement uploaded successfully!');
          dtx.image=event.body.fileName

          var id = this.actRoute.snapshot.paramMap.get('id');
          console.log(this.updateForm.value);
          this.Serviceapibackend.updateEquipement(id,dtx).subscribe(data => {
            this.equipement=data;
            console.log('tttttttttttttest1');
           
            console.log(data);

            this.updateForm.patchValue(data);
            console.log('tttttttttttttest222');

            console.log(this.updatePieceForm);
            this.message="Equipement was updated";
            this.router.navigate(['/list-equipement']);
            console.log(data);
            this.notifyService.showSuccess(" Bien modifier ","Equipement")

  
          })
  
         }
      },
      (err: any) => {
   
        console.log(err);
        this.progress = 0;
  
        if (err.error && err.error.message) {
          this.message = err.error.message;
          //this.notifyService.showDanger("erreur  !!","problém upload ! check again !")

        } else {
          this.message = 'Could not upload the file!';
          //this.notifyService.showDanger("erreur  !!","problém upload ! check again !")

        }
   
    
      
      });
    }

  // }
  //       else  {
  //     this.notifyService.showDanger("erreur  !!","verifier les champs vide")
  
  // }
}
  
   
  
   
//getService
readService() {

  this.Serviceapibackend.AllService().subscribe((data: {}) => {
    this.Service = data;
    console.log('service Service')
    console.log(this.Service)
  })
}
//get all Etat Equipement
readEtatEquipement(){
  this.Serviceapibackend.AllEtatequipement().subscribe((data: {}) => {
     this.Etatequipement = data;
     console.log('service Etat equipement')
     console.log(this.Etatequipement)
   }) 
 }
//method which gets called when a file is selected by the user
onFileChange(event:any) {

  if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      console.log(filesAmount)
      console.log(event.target.files)
      this.selectedFile=event.target.files;
      //this.updateForm.patchValue({ image: filesAmount });
      //this.updateForm.setValue(filesAmount.result);
      console.log(this.updateForm.value);
      //this.updateForm.get('image').setValue(filesAmount);  
       };
          
  }


}
