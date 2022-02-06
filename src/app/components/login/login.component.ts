import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() superadmin = {  email: '', password: '' }

  error=0;
  loginForm:any= FormGroup;
  submitted = false;
  loading = false;
  obj:any
 
  constructor(
    private fb: FormBuilder,private authService:BackendApiService,
    private router:Router,private sessionSotragesevice:SessionstorageService
  ) { 

 }
  form = {
    password:'',
    email:'',
  };
    

  ngOnInit() {


    // window.location.reload();
    // sessionStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.minLength(8)]],
    },);
  
    if (this.loginForm.invalid) {
      return;
    }
  
  }
    // convenience getter for easy access to form fields

  get loginFormControl() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
       // stop here if form is invalid
    if (this.loginForm.valid) {  
      console.log(this.loginForm.value);
      console.log("connexion est valid ")
      this.superadmin=  this.loginForm.value;
      console.log(this.superadmin.email,this.superadmin.password);
      this.loading = true;
       this.authService.login(this.superadmin).subscribe((result:any) => {  
        console.log('result service ');
        console.log(result);

     
        if(result.status ==true ) {   

         // alert(result.role)
        //localStorage.setItem('currentUser', JSON.stringify(result));//Pour stocker une objet localStorage 
       //this.sessionSotrage.set(obj) bech nhot feha objet login pwd err honi
       //this.sessionSotragesevice.setSessionObject( 'UserRole',result.role)
       this.sessionSotragesevice.set( 'UserRole',result.role);
       this.sessionSotragesevice.set( 'UserNom',result.user[0].nom);
       this.sessionSotragesevice.set( 'UserPrenom',result.user[0].prenom);
       this.sessionSotragesevice.set( 'UserEmail',result.user[0].email);
       this.sessionSotragesevice.set( 'UserTel',result.user[0].tel);
       this.sessionSotragesevice.set( 'Userfax',result.user[0].fax);
       this.sessionSotragesevice.set( 'UserPassword',result.user[0].password);
       this.sessionSotragesevice.set( 'UserAdresse',result.user[0].adresse);
       this.sessionSotragesevice.set( 'UserId',result.user[0].id);
       console.log(result.user[0])
       //this.sessionSotragesevice.set('user', JSON.stringify(result.user[0]));
       this.sessionSotragesevice.set( 'UserGrade',result.user[0].grade);
       

       console.log('loginnnnn');
       console.log( this.sessionSotragesevice.get( 'UserRole'));
       this.sessionSotragesevice.set( 'authenticated',true);
      // alert("from service "+this.sessionSotragesevice.get( 'UserRole'))

          this.router.navigate(['/home']);
          return true;
               
        }
          else{
            //msg d'err vous n'avez pas le droit !
            this.error=1;
            return false;
          }
         
      }); 
    }
      }
    }