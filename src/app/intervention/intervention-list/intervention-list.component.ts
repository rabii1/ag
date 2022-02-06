import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Demandepiece } from 'src/app/demandepiece.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { Tache } from 'src/app/tache.model';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.css']
})
export class InterventionListComponent implements OnInit {
  Intervention:any=[];
  closeModal:any ;
  id:any;
  Equipement:any=[];
  Ordre:any=[];
  Odreintervention:any=[];
  Userrole="";
  Usertel:string="";
  form2:any= FormGroup;
  Userprenom :string="";
  Usernom:string="";
  Useremail:string="";
  demandepiece:any=Demandepiece;
 intervention:any=Intervention;
 tache:any=Tache;
 Tache:any=[];
 click : boolean = true;
 ordreintervention:any=Ordreintervention;
 PiecesRechange:any=[];
 dropdownList:any = [{item_id: "",
 item_text: ""}];
 dropdownSettings :IDropdownSettings  ={
  singleSelection: false,
  idField: 'item_id',
  textField: 'item_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true
  
};

  constructor(   private notifyService : NotificationService,private actRoute: ActivatedRoute,
     private formBuilder: FormBuilder,private modalService: NgbModal,
  private route: ActivatedRoute,private sessionSotragesevice:SessionstorageService,
  private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,
  ) { }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    this.id = this.sessionSotragesevice.get('UserId');
    console.log(this.id)

    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    //console.log(this.Usertel)
    this.Usernom=this.sessionSotragesevice.get( 'UserPrenom');
    this.Userprenom=this.sessionSotragesevice.get( 'UserNom');
    this.Useremail=this.sessionSotragesevice.get( 'UserEmail');

    

    this.headerTitleService.setTitle(' Intervention');
    this.loadintervention();
    this.loadEquipement();
    this.Userrole = this.sessionSotragesevice.get('UserRole');
    let id = this.actRoute.snapshot.paramMap.get('id');
 
    
      this.form2 = this.formBuilder.group({
        quantite:this.formBuilder.array([
          this.formBuilder.group(new Demandepiece()),
             

        ]),

        })

      this.Serviceapibackend.AlPiecesRechange().subscribe((data: any) => {
        this.PiecesRechange=data;
        let list=[]
        for (let x = 0; x < data.length; x++) {
    
          const element = data[x];
          list.push({item_id:element.id,item_text:element.nom_piece+" | "+element.ref_piece})
    
          if(x==data.length-1) {
    
            this.dropdownList=list;
            console.log(this.dropdownList)
          }
        }
          })


  }


  loadEquipement(){
    this.Serviceapibackend.AllEquipement().subscribe((data: {}) => {
      this.Equipement = data;
      console.log('service Equipement')
      console.log(data)
    }) 
    }

  loadintervention(){
    if(this.Userrole=="technicien"){

    this.Serviceapibackend.getAllInterventionWithDetails(this.id).subscribe((data:{})=> {
      this.Intervention = data;
      console.log('service list intervention')
      console.log(data)
      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
      } );
      }, 1);
    
    })}
    else{
      this.Serviceapibackend.getAInterventionWithDetails().subscribe((data:{})=> {
        this.Intervention = data;
        console.log('service list intervention')
        console.log(data)

      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          retrieve: true,
          lengthMenu : [5, 10, 25],
          order:[[1,"desc"]]
      } );
      }, 1);
    
  })
}
  }



  deleteIntervention(){
    this.Serviceapibackend.deleteIntervention(this.id).subscribe(data => {
      this.loadintervention()
    })
  
  }
  triggerModalView(content:any,id:any) {
    this.id=id;

    this.Serviceapibackend.GetIntervention(id).subscribe((data:Intervention) => {
      this.intervention = data;
      console.log('get intervention with  deatils ')
      console.log(data)
    })
 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
    obj(id: any, obj: any) {
      throw new Error('Method not implemented.');
    }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  changeEtat(){
    this.click = !this.click;
    this.ordreintervention=this.route.snapshot.paramMap.get('id');

    this.Serviceapibackend.changeEtat(this.id,'suspendue').subscribe((data:any) => {
      console.log(data) 
      if(data.action){
        console.log(data)
        this.modalService.dismissAll('done')
      }
    }) 
  }
  SuspenduAdmin(idDem:string,id:string,idIn:string,equipement:string){
    console.log(this.Intervention)
    //alert( idDem +' - '+id+' - '+idIn+' - '+equipement)
    this.Serviceapibackend.ChangeEtatSuspenduAdminWithequip(idDem,id,idIn,'suspenduAdmin',equipement).subscribe((data:any) => {
      //alert("suspenduAdmin")
      console.log(data) 
      if(data.action){
        console.log(data)   
        this.modalService.dismissAll('done') 
      }
    })
  }
  // get sortData() {
  //   return this.Intervention.sort((a:any, b:any) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());
  // }
  quantite():FormArray{
    return this.form2.get("quantite")as FormArray
  }

  addQuantite( e:any) {
    // this.form.patchValue(["description"]);
  //const control =new FormControl();
  e.preventDefault();
    var x= this.form2.get('quantite') as FormArray ;
    x.push(this.formBuilder.group({
      piece:"",
      quantite:""
    })) 
  }
  
  removeQuantite(index:any) {
    //this.formUpdate.patchValue(["description"]);
  
   ( this.form2.get('quantite') as FormArray).removeAt(index);
  
  }
  Updatestatus(id:string){   
    console.log(this.form2.value);
    if (this.form2.valid){
     
      this.form2.value.interventions=this.route.snapshot.paramMap.get('id');
      this.Serviceapibackend.UpdatestatusEnattente( this.form2.value).subscribe((data:any) => {
        this.modalService.dismissAll('done')
        console .log ('piece manque')
        this.notifyService.showDanger("Demande de pièces bien modifier !!","verifier les champs vide")

        //alert(('piece manque'))
        if(data.action){
        }
      })
      }
      else{
        
        this.notifyService.showDanger("Demande de pièces  !!","verifier les champs vide")}
  
  }

  
submit(){
  
  
  if (this.form2.valid){
    this.form2.value.intervention=this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.updatedemandepiece(this.form2.value).subscribe(res => {
       console.log('demande de pieces created successfully!');
       console.log(this.form2.value )
       this.form2.patchValue(res); 

       this.notifyService.showSuccess("demande de pieces   !!","bien crée")
      }
       )}
      else{
        this.notifyService.showDanger("demande de pieces   !!","verifier les champs vide")
      }
}

triggerModal(content:any,id:any) {
  this.id=id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
  

}
