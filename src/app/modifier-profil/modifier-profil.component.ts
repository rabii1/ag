import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { BackendApiService } from '../services/backend-api.service';
import { SessionstorageService } from '../services/sessionstorage.service';
import { Superadmin } from '../superadmin.model';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  currentUser:any= Superadmin;
  message="";
  id: any;
  user:any;
  superadmin:any= Superadmin;
  updateProfilForm:any= FormGroup;
  Usergrade:string="";
  Userpassword:string=""
  Usernom:string="";
  Userprenom:string="";
  Useremail:string="";
  UserFax:string="";
  Usertel:string="";
  Userid:string="";
  Userrole:string="";
  userrol:any;
  nom:string="";
  password:any;
  tel:any;
  email:any
  constructor(private apiService:BackendApiService,
    private Serviceapibackend: BackendApiService,
    private router: Router,  private notifyService : NotificationService,
    public fb: FormBuilder,private sessionSotragesevice:SessionstorageService,
    private actRoute: ActivatedRoute) { 
                      
  var Userid = this.actRoute.snapshot.paramMap.get('UserId');
      //Pour recuperer une variable localStorage 
/* 
    this.user= JSON.parse(localStorage.getItem('currentUser')|| "");
  this.currentUser=this.user.superadmin[0]; */


 }

  ngOnInit(): void {
     
      this.Usernom=this.sessionSotragesevice.get('UserNom');
      this.Userprenom=this.sessionSotragesevice.get('UserPrenom');
      this.Useremail=this.sessionSotragesevice.get('UserEmail');
      this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
      this.UserFax=this.sessionSotragesevice.get( 'Userfax');
      this.Userpassword=this.sessionSotragesevice.get( 'UserPassword');
      this.Userid=this.sessionSotragesevice.get( 'UserId');
     // this.userrole=this.sessionSotragesevice.get( 'UserRole');
      this.Usergrade=this.sessionSotragesevice.get( 'UserGrade');
      this.Userrole= this.sessionSotragesevice.get( 'UserRole')
      console.log(this.sessionSotragesevice.get( 'UserNom'));
      console.log(this.sessionSotragesevice.get( 'UserPrenom'));
      console.log(this.sessionSotragesevice.get( 'UserEmail'));
      console.log(this.sessionSotragesevice.get( 'UserPassword'));
      console.log(this.sessionSotragesevice.get( 'UserRole'));
     /*  console.log(this.sessionSotragesevice.get( 'UserId')); */


      this.updateProfilForm = this.fb.group({
        nom: [this.Usernom , Validators.required],
       prenom: [this.Userprenom , Validators.required],
       email: [this.Useremail , Validators.required],
         tel: [this.Usertel , Validators.required],
         fax: [this.UserFax ],
         grade: [this.Usergrade],
         password: [this.Userpassword , Validators.required] 
   })
   

      

    
  }

 
submitForm(){
  if (this.updateProfilForm.valid){
  console.log(this.updateProfilForm.value)
  var values = this.updateProfilForm.value;
  console.log('updateprofil')
    this.updateProfilForm.value.Userid=this.Userid;
    console.log(this.updateProfilForm.value.Userid)
   //updated selon le role 
    this.updateProfilForm.value.Userid=this.sessionSotragesevice.get( 'UserRole');
    this.apiService.updateUserConnected(this.sessionSotragesevice.get( 'UserRole'),this.updateProfilForm.value).subscribe(data => {
     // this.sessionSotragesevice.set('user', JSON.stringify(data));
       this.sessionSotragesevice.set( 'UserNom',( values.nom));
      this.sessionSotragesevice.set( 'UserPrenom',(values.prenom));
      this.sessionSotragesevice.set( 'UserEmail',(values.email));
      this.sessionSotragesevice.set( 'UserTel',(values.tel));
      this.sessionSotragesevice.set( 'Userfax',(values.fax));
      this.sessionSotragesevice.set( 'UserPassword',(values.password));
      this.sessionSotragesevice.set( 'UserGrade',(values.grade));
      this.sessionSotragesevice.set( 'UserId',(values.id));
 
    this.userrol=data;
   // this.sessionSotragesevice.get( 'UserRole')=data;
   // this.userrole=this.sessionSotragesevice.get( 'UserRole');
    this.updateProfilForm.patchValue(data);

    console.log(data);
 
    this.router.navigate(['/profil']);
    this.notifyService.showSuccess("  ","Bien modifier")
})
  }
  else{
    console.log(this.updateProfilForm.valid);
   
    this.notifyService.showDanger("erreur  ","verifier les champs vide")
  }
}


}
