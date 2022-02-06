import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Service } from 'src/app/service.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-demandeintervention-create',
  templateUrl: './demandeintervention-create.component.html',
  styleUrls: ['./demandeintervention-create.component.css']
})
export class DemandeinterventionCreateComponent implements OnInit {
  Usertel:string="";
  Useradresse:string="";
  Employee: any = [];
  Ordreintervention: any = [];
  form: any = FormGroup;
  submitted = false;
  Equipement: any = [];
  Service: any = [];
  Userrole:string="";
  idEmployee:string="";
  checkArray:any=[];
  Po:any
  minDate :any;
  Priorite:any=['Normale','Moyenne','Elevée'];
  constructor(    private headerTitleService: HeaderTitleService,
    private notifyService : NotificationService,private Serviceapibackend: BackendApiService,
   private router: Router, private formBuilder: FormBuilder,private sessionSotragesevice:SessionstorageService) {

    this.form = this.formBuilder.group({
    checkArray: this.formBuilder.array([], [Validators.required])
  })
    }
 
                     data: Array<any>  =[
    
                      {name:'Dépannage', value:'Dépannage'},
                      {name:'Installation matériel',  value:'Installation matériel'},
                      {name:'Installation logiciel',  value:'Installation logiciel'},
                      {name:'Mise a jour/maintenance préventive',  value:'Mise a jour/maintenance préventive'},
                      {name:'Diagnostic',  value:'Diagnostic'},
                      {name:'Intervention en atelier',  value:'Intervention en atelier'},
                      {name:'Intervention sur site',  value:'Intervention sur site'},
                      {name:'Télémaintenance',  value:'Télémaintenance'},
                      ];
 
   ngOnInit(): void { 
     
    var iso = new Date().toISOString();
   // alert(iso.substring(0,iso.length-8))
   this.minDate = iso.substring(0,iso.length-8);
    // var today = new Date();
    // var date = (today.toDateString());
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.headerTitleService.setTitle(' LANCER DEMANDE INTERVENTION');console.log('Lancer demande intervention')

     if(this.Userrole =="employee") 
    this.form = this.formBuilder.group({
      panne: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(8)]],
      dureearretmachine: ['', [Validators.required]],
      //tempstravail: ['', Validators.required],
     // employee: ['', Validators.required],
      priorite: ['', Validators.required],
      // status: ['', Validators.required],
      equipement: ['', Validators.required],
      service: ['', Validators.required],
     

    },
    );
    else 
    this.form = this.formBuilder.group({
      panne: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(8)]],
      dureearretmachine: ['', [Validators.required]],
      //tempstravail: ['', Validators.required],
      employee: ['', Validators.required],
      priorite: ['', Validators.required],
      // status: ['', Validators.required],
      equipement: ['', Validators.required],
      service: ['', Validators.required],
     

    },
    );
    this.readService();
    this.readEmployee();
    this.readOrdre();
     this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    console.log(this.Usertel)
    this.Useradresse=this.sessionSotragesevice.get( 'UserAdresse');
    console.log(this.Useradresse)
    this.headerTitleService.setTitle(' Lancer une demande');console.log('Lancer une demande')
    this.idEmployee= this.sessionSotragesevice.get('UserId');
  }
   changePanne(e: any) {
    this.form.patchValue({panne: e.target.value});
    console.log("change");
   
    console.log(e.target.value)
  } 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;


  }
//get all service
readService() {

  this.Serviceapibackend.AllService().subscribe((data: {}) => {
    this.Service = data;
    console.log('service Service')
    console.log(this.Service)
  })
}
  save() {
    console.log(this.form.value);
    this.submitted = true
    this.Po;
    if (this.form.valid) {
      if (this.Userrole=="employee"){

        this.form.value.employee=this.idEmployee     }
        else{
          this.form.value.admin=this.sessionSotragesevice.get('UserId')
        }
      this.form.value.panne=this.checkArray.join(' - ');
   
      if(this.Userrole=="admin"){
      this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(res => {
        console.log('demande created successfully!');
        this.notifyService.showSuccess("demande d'intervention  !!","bien crée")
        this.router.navigate(['/demandeNontraiter'])
        console.log(this.form.value)
      })
    }else{
      this.Serviceapibackend.createDemandeintervention(this.form.value).subscribe(res => {
        console.log('demande created successfully!');
        this.notifyService.showSuccess(" Bien crée","Demande d'intervention")
        this.router.navigate(['/DemandeNontraiter'])
        console.log(this.form.value)
      })
      }

   } 
   else {
    this.notifyService.showDanger("erreur  !!","Vérifier les champs vide")
      console.log(this.form)
    } 
  }
  
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
      //alert('service ordre chbik matemchich :( ')

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
      console.log("priorite",e.value)
      // this.priorite.setValue(e.target.value, {
      //   onlySelf: true
      // })
      this.Po=e
    }
      // Getter method to access formcontrols

// get priorite(){
//   return this.form.get('priorite');

// }
selectService(e:any){

}

loadEquipement(e:any){
  //alert(e.target.value)
  this.Serviceapibackend.getEquipementByService(e.target.value).subscribe((data: {}) => {
    console.log(data)
    console.log('service ordre')
    this.Equipement=data
    //alert('service ordre chbik matemchich :( ')

   })
}

onCheckboxChange(e:any) {
//  const checkArray: FormArray = this.form.get('checkArray') as FormArray;

//alert(e.target.value)
if (e.target.checked) {
  this.checkArray.push(e.target.value);
} else {
  let i: number =   this.checkArray.findIndex((el:any) => el ==  e.target.value)
   this.checkArray.splice(i,1)
 
 
}
console.log(this.checkArray)
}
}
