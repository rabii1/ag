import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Demandepiece } from 'src/app/demandepiece.model';
import { Intervention } from 'src/app/intervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-intervention-update',
  templateUrl: './intervention-update.component.html',
  styleUrls: ['./intervention-update.component.css']
})
export class InterventionUpdateComponent implements OnInit {
  public button_name : any = 'exception';
  form:any= FormGroup;
  form2:any= FormGroup;
  Usertel:string="";
  etat:any=""
  isWaiting:boolean=true
  listdemande:any=[]
  Useradresse:string="";
  submitted = false;
  etatin:any ="";
  Technicien: any = [];
  Ordre: any = [];
  Degre:any=['primaire','secondaire '];
  dropdownList:any = [{item_id: "",
  item_text: ""}];
  selectedItems:any = [];
  listTemp:any=[];
  Equipement:any=[];
  closeModal:any ;
  etat1:string="en cours"
  etat2:string="arreter"
  etat3:string="terminer"
  demandepiece:any=Demandepiece;

  id:any;
  Pie:any=[]
  intervention:any={ordreintervention:{debutprevu:''},etat:'arreter'};
  ordreintervention:any=Ordreintervention;
  //form:any= FormGroup;
  PiecesRechange:any=[];
  Userrole:string="";
  idTechnicien:string="";
  minDate :any;

  dropdownSettings :IDropdownSettings  ={
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
    
  };


  constructor(private modalService: NgbModal ,private actRoute: ActivatedRoute, 
    private notifyService : NotificationService,private route: ActivatedRoute,
  private router: Router,private formBuilder: FormBuilder,
  private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService,) { 
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      listp:[''],
      date_debut: ['', Validators.required],
      etat: [''],
      observation: ['', Validators.required],
       tachesx:  this.formBuilder.array([]),
        });



    let iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    this.idTechnicien= this.sessionSotragesevice.get('UserId');

     
    
    
    this.Serviceapibackend.getintervention(id).subscribe ( (data:any) => { 
      console.log(data)
      data.pieceinterventions.forEach((el:any) => { 

        let pc=this.PiecesRechange.filter((piece:any) => piece.id ===el.piece)

       this.selectedItems.push({item_id:el.piece,item_text: pc[0].nom_piece+' | '+ pc[0].ref_piece}) 
       console.log(el)
       console.log(this.selectedItems,"list piece necesssaire")
      });
      this.intervention=data; 
      this.etat=data.etat;
      console.log(data,"get intervention by id ")
      this.form2 = this.formBuilder.group({
        quantite:this.formBuilder.array([]),
        })
        let x= this.form2.get('quantite') as FormArray ;
        x.push(this.formBuilder.group({
            piece:"",
            quantite:""      
          })) 
      this.InitTache(data.taches)
    })


  }


/****** Array list tache *******/


  quantite():FormArray{
    return this.form2.get("quantite")as FormArray
  }

  addQuantite( e:any) {

  e.preventDefault();
    var x= this.form2.get('quantite') as FormArray ;
    x.push(this.formBuilder.group({
      piece:"",
      quantite:""
    })) 
  }
  
  removeQuantite(index:any) {
  
   ( this.form2.get('quantite') as FormArray).removeAt(index);
  
  }
  
  cc(item:any){

    alert(item)
  }

  
  onItemSelect(item: any) {
         console.log('eeeeeeeeeee')
       alert(item)
    this.selectedItems.push(item);
    console.log(this.selectedItems)

  }
  OnItemDeSelect(item:any) {

    console.log(item +" edelete")
      var x= this.selectedItems.filter((itemx:any) => itemx !=item.item_id)
      this.selectedItems=x;
      alert(item)

      console.log(  this.selectedItems)
  }
  onSelectAll(items: any) {
    console.log(items);
    alert(items)

  }

 get f() {
  return this.form.controls;
}
/****** Array list tache *******/
description():FormArray{
  return this.form.get("tachesx")as FormArray
}



InitTache(listtache:any) {

console.log("rrrrrrrrrrrrrrrrrrr")
console.log(listtache)
  var x= this.form.get('tachesx') as FormArray ;

  for (let i = 0; i < listtache.length; i++) {
    const el = listtache[i];
    
  x.push(this.formBuilder.group({
    taches:el.description,
    date:el.date
  })) 

  }

}

addTache(e:any) {

  e.preventDefault();
  var x= this.form.get('tachesx') as FormArray ;
  x.push(this.formBuilder.group({
    tache:'',
    date:''
  })) 
}

removeTache(index:any) {

 ( this.form.get('tachesx') as FormArray).removeAt(index);}


 ngAfterViewInit(){
  
console.log('afterr view init ***************')
console.log(this.selectedItems);
  setTimeout(() => {
    this.form.patchValue({
      listp: this.selectedItems 
    });
  }, 2000);
  
}
submitForm(){
  
  if (this.form.valid){
    


    this.submitted = true;
    var id=this.route.snapshot.paramMap.get('id');
    if(!this.isWaiting){
      this.form.value.etat='en attente des pieces';
      this.form.value.listDemandePiece=this.listdemande
    }else{

      this.form.value.etat=this.etat;

    }
    this.form.value.demandepieces=this.intervention.dem.id
    this.form.value.equipement=this.intervention.dem.equipement.id
    this.form.value.ordreintervention=this.intervention.ordreintervention.id
    console.log(this.form.value)
      this.Serviceapibackend.updateIntervention(id,this.form.value).subscribe(data => {
      this.intervention=data;
         console.log(' intervention updated successfully!');
        console.log(this.form.value)
        this.form.patchValue({...data})
        console.log(data)
        this.router.navigate(['/list-intervention'])
        this.notifyService.showSuccess("Intervention  ","Bien modifier")
      }) 
    }
    else{
      console.log(this.form.valid);
      console.log(this.form);

      this.notifyService.showDanger("erreur  ","verifier les champs vide")
    }
}

changeEat(e: any) {
    
 
 
  this.etatin=e.target.value;
 console.log(e.target.value)


 } 

 


Updatestatus(){   
  console.log(this.form2.value);
  if (this.form2.valid){
   
 this.listdemande=   this.form2.value;
 this.isWaiting=false
 this.modalService.dismissAll('done')
 console .log ('piece manque')
    }
    else{
      
      this.notifyService.showDanger("Demande de pièces  !!","verifier les champs vide")}

}

triggerModal(content:any,id:any) {
  this.id=id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
  obj(id: any, obj: any) {
    throw new Error('Method not implemented.');
  }
 getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

submit(){
  

  if (this.form2.valid){
    this.form2.value.intervention=this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.createDemandedePiece(this.form2.value).subscribe(res => {
       console.log('demande de pieces created successfully!');
       console.log(this.form2.value )
       this.router.navigate(['/list-intervention'])

       this.notifyService.showSuccess("demande de pieces   !!","bien crée")
      }
       )}
      else{
        this.notifyService.showDanger("demande de pieces   !!","verifier les champs vide")
      }
}
}
