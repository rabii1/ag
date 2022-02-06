import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { Employee } from 'src/app/employee.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-demandeintervention-update',
  templateUrl: './demandeintervention-update.component.html',
  styleUrls: ['./demandeintervention-update.component.css']
})
export class DemandeinterventionUpdateComponent implements OnInit {
 

Usertel:string="";
  Useradresse:string="";
  Employee: any = [];
  Ordreintervention: any = [];
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Service: any = [];
  Userrole:string="";
  message="";
  minDate:any;
  idEmployee:string="";
  checkArray:Array<String>=[];
  
  data:  any  =[
    
    {name:'Dépannage', value:'Dépannage',check:false},
    {name:'Installation matériel',  value:'Installation matériel',check:false},
    {name:'Installation logiciel',  value:'Installation logiciel',check:false},
    {name:'Mise a jour/maintenance préventive',  value:'Mise a jour/maintenance préventive',check:false},
    {name:'Diagnostic',  value:'Diagnostic',check:false},
    {name:'Intervention en atelier',  value:'Intervention en atelier',check:false},
    {name:'Intervention sur site',  value:'Intervention sur site',check:false},
    {name:'Télémaintenance',  value:'Télémaintenance',check:false},
    ];
  demandeIntervention:any=Demandeintervention
  //  message=" ";
  Priorite:any=['Normale','Moyenne','Elevée'];
  constructor(    private headerTitleService: HeaderTitleService,
    private notifyService : NotificationService,private Serviceapibackend: BackendApiService,
   private router: Router,private actRoute: ActivatedRoute, private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService) {

    this.form = this.formBuilder.group({
    checkArray: this.formBuilder.array([], [Validators.required])
  })


  var id = this.actRoute.snapshot.paramMap.get('id');
  this.Serviceapibackend.ShowDemandebyId(id).subscribe ( (data => {
    this.demandeIntervention=data;
    data.service=data.equipement.service;
    this.loadEquipementbyId(data.equipement.service)
    data.equipement=data.equipement.id;
    /************Mr err ici id de employee */
    if(this.Userrole =="employee || admin") {
    data.employee=data.employee.id
    }
    var listTache=data.panne.split(' - ')
    this.checkArray=listTache;

  var dx=  this.data.map((elem:any) => {

      let res =listTache.filter((el:any)=>{
        return elem.value==el

      })
      if (res.length != 0) {
        elem.check=true;
        return  elem
      } else {
        return elem
      }

    })
this.data=dx;

    this.form.patchValue({...data}); 
    console.log("cxxxxxxxxxxxxxxxx");
    console.log(listTache);
    console.log(data);
    if(this.Userrole =="employee") {
  this.form = this.formBuilder.group({
    
    panne: [data.panne],
    date: [data.date],
    description: [data.description],
    dureearretmachine: [data.dureearretmachine],
    //tempstravail: [data.tempstravail],
    priorite: [data.priorite],
    equipement: [data.equipement], 
    service: [data.service] })
  

 } else 
  this.form = this.formBuilder.group({
    panne:[data.panne,Validators.required],
    date: [data.date,Validators.required],
    description:  [data.description,Validators.required],
    dureearretmachine:[data.dureearretmachine,Validators.required],
    //tempstravail:[data.tempstravail],
    employee: [data.employee.id,Validators.required],
    priorite: [data.priorite,Validators.required],
    equipement: [data.equipement,Validators.required], 
    service: [data.service,Validators.required] 
  })
  })

  )}
 
 
   ngOnInit(): void { 
    var iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
    this.updateForm();
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.readService();
    this.readEmployee();
    this.readOrdre();
     this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.headerTitleService.setTitle('MISE A JOUR DEMANDE INTERVENTION');console.log(' Mise a jour une demande')
    this.idEmployee= this.sessionSotragesevice.get('UserId');
  }
   changePanne(e: any) {
    //this.form.patchValue({panne: e.target.value});
    console.log("change");
   
    console.log(e.target.value)
  } 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;


  }
  updateForm(){
    
    this.form = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      adresse: [''],
      tel: [''],
      panne:[''],
      date: [''],
      description:  [''],
      dureearretmachine:[''],
     // tempstravail:[''],
      employee: [''],
      priorite: [''],
      equipement: [''], 
      service: [''] 


    })    
  }
//get all service
readService() {

  this.Serviceapibackend.AllService().subscribe((data: {}) => {
    this.Service = data;
    console.log('service Service')
    console.log(this.Service)
  })
}
submitForm(){
  console.log(this.form.value);
  this.submitted = true
  if (this.form.valid) {
    if (this.Userrole=="employee"){

      this.form.value.employee=this.idEmployee     }
      else{
        this.form.value.admin=this.sessionSotragesevice.get('UserId')
      }
    this.form.value.panne=this.checkArray.join(' - ');
    this.form.value.employee=this.idEmployee ;
    if(this.Userrole=="admin"){
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.form.value);
  this.Serviceapibackend.updateDemande(id, this.form.value).subscribe(data => {
    this.demandeIntervention=data;
    this.notifyService.showSuccess("demande d'intervention  !!","Modifier")

    this.form.patchValue({...data}); 

    console.log(data);
    console.log(this.form.value);
    this.message="demande was updated";
    this.router.navigate(['/demandeNontraiter']);
    console.log(data);
  })
}else{
  var id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.form.value);
  this.Serviceapibackend.updateDemande(id, this.form.value).subscribe(data => {
    this.demandeIntervention=data;
    this.form.patchValue({...data}); 
     this.notifyService.showSuccess("demande d'intervention  !!","Modifier")

    console.log(data);
    console.log(this.form.value);
    this.message="demande was updated";
    this.router.navigate(['/demandeNontraiter']);
    console.log(data);
  })
}
}
else{
  console.log(this.form.valid);
  this.notifyService.showDanger("erreur  !!","verifier les champs vide")
}
}
  // save() {
  //   console.log(this.form.value);
  //   this.submitted = true
  //   if (this.form.valid) {
  //     if (this.Userrole=="employee"){

  //       this.form.value.employee=this.idEmployee     }
  //       else{
  //         this.form.value.admin=this.sessionSotragesevice.get('UserId')
  //       }
  //     this.form.value.panne=this.checkArray.join(' - ');
  //     this.form.value.employee=this.idEmployee ;
  //     if(this.Userrole=="admin"){
  //     this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(res => {
  //       console.log('demande created successfully!');
  //       this.notifyService.showSuccess("demande d'intervention  !!","bien crée")
  //       this.router.navigate(['/demandeNontraiter'])
  //       console.log(this.form.value)
  //     })
  //   }else{
  //     this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(res => {
  //       console.log('demande created successfully!');
  //       this.notifyService.showSuccess("demande d'intervention  !!","bien crée")
  //       this.router.navigate(['/DemandeNontraiter'])
  //       console.log(this.form.value)
  //     })
  //     }

  //  } 
  //  else {
  //   this.notifyService.showDanger("erreur  !!","verifier les champs vide")
  //     console.log(this.form)
  //   } 
  // }
  
  //getEmployee
  readEmployee() {

    this.Serviceapibackend.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      console.log('service employee')
      console.log(this.Employee)
    })
  }
  //get all ordre intervention
  readOrdre() {
    this.Serviceapibackend.getOrdre().subscribe((data: {}) => {
      this.Ordreintervention = data;
      console.log('service ordre')
      console.log(this.Ordreintervention)
    })


  }
    //get all Equipement 
    readEquipement() {
      this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
        this.Equipement = data;
        console.log('service Equipement')
        //alert('service ordre chbik matemchich :( ')
  
        console.log(this.Equipement)
      })
    }
    changePriorite(e:any){
      console.log(e.value)
      this.priorite.setValue(e.target.value, {
        onlySelf: true
      })
    }
  // Getter method to access formcontrols

get priorite(){
  return this.form.get('priorite');

}
selectService(e:any){
  this.form.patchValue(e.target.value); 

  // this.form.patchValue({service: e.target.value});
}

loadEquipement(e:any){
  //alert(e.target.value)
  this.Serviceapibackend.getEquipementByService(e.target.value).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data


   })
}
loadEquipementbyId(e:any){
  //alert(e.target.value)
  this.Serviceapibackend.getEquipementByService(e).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data


   })
}
onCheckboxChange(e:any) {

alert(e.target.value)
if (e.target.checked) {
  this.checkArray.push(e.target.value);

} else {
  let i: number = 0;
  this.checkArray=this.checkArray.splice(i,1)
  this.checkArray.map(item =>  item != e.target.value)
}
console.log(this.checkArray)
}
}
