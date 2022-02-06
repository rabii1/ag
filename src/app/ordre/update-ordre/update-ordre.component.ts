import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-update-ordre',
  templateUrl: './update-ordre.component.html',
  styleUrls: ['./update-ordre.component.css']
})
export class UpdateOrdreComponent implements OnInit {
  public show_div : boolean = false;
  Dateestimation:any= ['Heurs','Jours'] ;
   Degre:any=['Normale','Moyenne','Elevée'];
  Demandeintervention:any=[];
  Ordreintervention:any=[]
  Equipement: any = [];
  Technicien: any = [];

  NBOrdre:any=0;
  message="";
  id: any;
  ordreintervention:any;
  updateForm:any= FormGroup;
  demandeintervention:any=Demandeintervention;
  Usertel:string="";
  Useradresse:string="";
  minDate:any;
  de:any;
  du:any;
  idTech:string =""; 

  constructor( 
    private notifyService : NotificationService,
    private Serviceapibackend: BackendApiService,private sessionSotragesevice:SessionstorageService,
                private router: Router, private formBuilder: FormBuilder,
                public fb: FormBuilder,private route: ActivatedRoute,
                private actRoute: ActivatedRoute) 
                {
                  var id = this.actRoute.snapshot.paramMap.get('id');

 
   
    this.Serviceapibackend.getOrdreintervention(id).subscribe((data:Ordreintervention) => {
      this.ordreintervention = data; 

      console.log(data);
      let pe=data.dateestimation.split(' ');

      //alert(pe[0]);

    this.updateForm = this.fb.group({
      dateestimation: [pe[0],Validators.required],
      debutprevu: [data.debutprevu, Validators.required],
      technicien: [data.technicien.id, Validators.required],
      degre_urgence: [data.degre_urgence, Validators.required],
      nature_de_travaux: [data.nature_de_travaux ],
      reparation: [pe[1],Validators.required],
      equipement:[data.demandeintervention.equipement,] 
    }
      )
   }) 
                }

                  
  
  ngOnInit(): void {

    
  
  
 
   // this.updateForm();
    this.getEquipement();
    this.readTechnicien();
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
  
   this.idTech= this.route.snapshot.paramMap.get('idTech') || "";
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
   
  }
  updateform(){
    
    this.updateForm = this.fb.group({
      debutprevu: [''],
      dateestimation: [''],
      technicien: [''],
      degre_urgence: [''],
      nature_de_travaux: [''],
      //equipement:[''],


    })    
  }
  getEquipement(){
  
    this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
      this.Equipement = data;
      console.log('service Equipement')
      console.log(this.Equipement)
    })
  }  
  readTechnicien(){
    this.Serviceapibackend.getTechniciens().subscribe((data: any) => {
      this.Technicien = data;

    let s=  data.map((el:any) => {

      if (el.id != this.idTech)
      return el
      else 
      return null

    })
    this.Technicien=s.filter((item:any) => item )
      console.log('service getTechniciens')
      console.log(this.Technicien)
    })
  }
// Choose degre using select dropdown
changeCity(e:any) {
  console.log("degre urgence",e)
  console.log( e)

  this.du=e
  //this.du.setValuee(e.target.value);
  // this.degre_urgence.setValue(e.target.value, {
  //   onlySelf: true
  // })
 
}
  submitForm(){
      
 if (this.updateForm.valid) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.updateForm.value.pe=this.updateForm.value.dateestimation +' '+ this.de;

    console.log(this.updateForm.value);
    this.Serviceapibackend.updateOrdre(id, this.updateForm.value).subscribe(data => {
      this.ordreintervention=data;
      //data.demandeintervention.equipement=data.demandeintervention.equipement;
      //data.technicien=data.technicien.id

      this.updateForm.patchValue(data); 

      console.log(data);
      console.log(this.updateForm.value);
      this.message="ordreintervention was updated";
      this.router.navigate(['/list-Ordre']);
      this.notifyService.showSuccess("Bien modifier","Ordre d'intervention ")

      console.log(data);
  })
 }
 else{
  console.log(this.updateForm.valid);
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")
}

}
get f() {
  return this.updateForm.controls;


}
changeDateEstim(e:any) {
  console.log("Période de fin de réparation",e ) 
  console.log( e)
  this.de=e ;




}
    
Stat(i:string){

  this.Serviceapibackend.getCountOrdre(i).subscribe((data: any) => {
    console.log('service Count Ordreintervention ')
    this.NBOrdre=data.totalOrdre;
//alert(this.NBOrdre)

    console.log(this.NBOrdre)
  })
  
}
selectEat(e:any){
  this.show_div  =true
  //this.form.value.technicien=this.route.snapshot.paramMap.get('id');
  //var id = this.route.snapshot.paramMap.get('id');
  this.Stat(e.target.value)
  this.Serviceapibackend.getInterventionByTechnicienFromDay(e.target.value).subscribe((data:{}) => {
    //this.ordreintervention = data;
    this.ordreintervention = data; 
    console.log('get etat ordreintervention by id');
    //alert(data)
    console.log(data);
   }) 
}
}
