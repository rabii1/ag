import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-create-ordre',
  templateUrl: './create-ordre.component.html',
  styleUrls: ['./create-ordre.component.css']
})
export class CreateOrdreComponent implements OnInit {
  form: any = FormGroup;
  Usertel:string="";
  Useradresse:string="";
  submitted = false;
  Technicien: any = [];
  Equipement: any = [];
  de:any;
  du:any;
    idTech:string =""; 
    Dateestimation:any= ['Heurs','Jours'] ;
  // Etat: any = ['valider','rejetee']  ;
   Degre:any=['Normale','Moyenne','Elevée'];
   minDate:any;
  id:any;
  ordreintervention:any= Ordreintervention;
  demandeintervention:any=Demandeintervention;
  Demandeintervention:any=[];
  idadmin:any;
  Userrole:string="";
  // ordreintervention:any;
  Ordreintervention:any=[];
  intervention:any;
  Intervention:any=[];
  NBOrdre:any=0;
  public show_div : boolean = false;
  constructor( private notifyService : NotificationService,
    private router: Router,private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService,
    private Serviceapibackend: BackendApiService,private route: ActivatedRoute) {
   
  
     }

  ngOnInit(): void {

    
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
  
    var id = this.route.snapshot.paramMap.get('id');
   this.idTech= this.route.snapshot.paramMap.get('idTech') || "";
  //  alert(id)
    this.Serviceapibackend.getDemandeintervention(id).subscribe((data: Demandeintervention) => {
      this.demandeintervention = data; 
      console.log('get intervention by id');
      this.form = this.formBuilder.group({
        equipement: [data.equipement.id, Validators.required],
       // date : [data.tempstravail, Validators.required],
        nature_de_travaux :[data.panne, Validators.required],
        degre_urgence: [data.priorite, Validators.required],
        technicien: ['', Validators.required],
        debutprevu: ['', Validators.required],
        dateestimation: ['', Validators.required],
        reparation: ['', Validators.required],
      })
      console.log(data);
    })
 
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.readTechnicien();
    this.getEquipement();
    this.updateForm();
  
   
  }
  selectEat(e:any){
    this.show_div  =true
    //this.form.value.technicien=this.route.snapshot.paramMap.get('id');
    //var id = this.route.snapshot.paramMap.get('id');
    this.Stat(e.target.value)
    this.Serviceapibackend.getInterventionByTechnicienFromDay(e.target.value).subscribe((data:{}) => {
      //this.ordreintervention = data;
      this.Ordreintervention = data; 
      console.log('get etat ordreintervention by id');
      //alert(data)
      console.log(data);
     }) 
  }
  
  
 // convenience getter for easy access to form fields
 get f() {
  return this.form.controls;


}

updateForm(){
    
  this.form = this.formBuilder.group({
    equipement: [''],
    priorite: [''],
    panne:['']
 

  })   } 
getEquipement(){
  
  this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
    this.Equipement = data;
    console.log('service Equipement')
    console.log(this.Equipement)
  })
  
}
  //getTechnicien
  readTechnicien() {

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
save() {
  
 if (this.form.valid) {
    console.log(this.form.value);
    this.submitted = true
    this.du;
    this.form.value.pe=this.form.value.dateestimation +' '+ this.de;
     this.form.value.demandeintervention=this.route.snapshot.paramMap.get('id');
     this.Serviceapibackend.createOrdreintervention(this.form.value).subscribe(res => {
      console.log(this.form.value)
      console.log(this.form.value.demandeintervention)
      console.log('create ordre by id demande')
      console.log('ordre intervention created successfully!');
      this.router.navigate(['/list-Ordre'])
      this.notifyService.showSuccess(" Bien crée","Ordre d'intervention")
    })   
  }
  else {
      this.notifyService.showDanger("erreur  !!","verifier les champs vide")
        console.log(this.form)
      }
}



// Choose degre using select dropdown
changeCity(e:any) {
  console.log("degre urgence",e)
  console.log( e)

  this.du=e
  // this.degre_urgence.setValue(e.target.value, {
  //   onlySelf: true
  // })
 
}
changeDateEstim(e:any) {
  console.log("Période de fin de réparation",e ) 
  console.log( e)
  this.de=e ;
}
 
  // Getter method to access formcontrols

// get degre_urgence(){
//   return this.form.get('degre_urgence');

// }

// format date in typescript
 getFormatedDate(date: Date, format: string) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(date, format);
    } 
    
Stat(i:string){

  this.Serviceapibackend.getCountOrdre(i).subscribe((data: any) => {
    console.log('service Count Ordreintervention ')
    this.NBOrdre=data.totalOrdre;
//alert(this.NBOrdre)

    console.log(this.NBOrdre)
  })
  
}
    

}
