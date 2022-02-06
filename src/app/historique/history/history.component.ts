import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Demandepiece } from 'src/app/demandepiece.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public button_name : any = 'exception';
  form:any= FormGroup;
  form2:any= FormGroup;
  Usertel:string="";
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
  private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService) { }

  ngOnInit(): void {
      
    let iso = new Date().toISOString();
    this.minDate = iso.substring(0,iso.length-8);
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    this.idTechnicien= this.sessionSotragesevice.get('UserId');
    this.Serviceapibackend.getintervention(id).subscribe ( (data) => {
      this.intervention=data; })
    this.Serviceapibackend.getdemandepieceById(id).subscribe ( (data) => {
      this.demandepiece = data;
    
      console.log(data,"get demandepiece by id ")
      this.form2 = this.formBuilder.group({
        quantite:this.formBuilder.array([
          this.formBuilder.group(new Demandepiece()),
             
          //this.formBuilder.group(new Demandepiece()),

        ]),

        //piece: [data.piece, Validators.required],
        //quantite: [data.quantite, Validators.required],
        })

                let x= this.form2.get('quantite') as FormArray ;
                x.push(this.formBuilder.group({
                    piece:"",
                    quantite:""
                  })) 

              //this.InitTache(data.taches)
              
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
            });

  }
  /****** Array list tache *******/


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
      console.log(  this.selectedItems)
  }
  onSelectAll(items: any) {
    console.log(items);
  }
//   onItemSelect(item:any){
//     console.log(item);
//     this.selectedItems.push(item);
//     console.log(this.selectedItems);
// }
// OnItemDeSelect(item:any){
//     console.log(item);
//     var x= this.selectedItems.filter((itemx:any) => itemx !=item.item_id)
//      this.selectedItems=x;
//     console.log(this.selectedItems);
// }
// onSelectAll(items: any){
//     console.log(items);
// }
// onDeSelectAll(items: any){
//     console.log(items);
// }
 

  // onItemlist(item: any) {
  //   alert('zzz')
  //   console.log('eeeeeeeeeee')
  //   this.selectedItems.push(item);
  //   console.log(this.selectedItems)

  // }
  // onItemDelist(item:any) {
  //   console.log(item +" edelete")
  //     var x= this.selectedItems.filter((itemx:any) => itemx !=item.item_id)

  //     this.selectedItems=x;
  //     console.log(  this.selectedItems)
  // }
  // onlistAll(items: any) {
  //   console.log(items);
  // }
 // convenience getter for easy access to form fields
 get f() {
  return this.form.controls;
}
/****** Array list tache *******/
description():FormArray{
  return this.form.get("taches")as FormArray
}



InitTache(listtache:any) {

console.log("rrrrrrrrrrrrrrrrrrr")
console.log(listtache)
  var x= this.form.get('taches') as FormArray ;

  for (let i = 0; i < listtache.length; i++) {
    const el = listtache[i];
    
  x.push(this.formBuilder.group({
    taches:el.taches,
    date:el.date
  })) 

  }

}

addTache(e:any) {

  e.preventDefault();
  var x= this.form.get('taches') as FormArray ;
  x.push(this.formBuilder.group({
    tache:'',
    date:''
  })) 
}

removeTache(index:any) {

 ( this.form.get('taches') as FormArray).removeAt(index);}



submitForm(){
  
  if (this.form.valid){
    console.log(this.form.valid);
    this.submitted = true;
    var id=this.route.snapshot.paramMap.get('id');
    this.form.value.etat=this.etatin;
    this.form.value.listp=this.selectedItems.item;

      this.Serviceapibackend.updateIntervention(id,this.form.value).subscribe(data => {
      this.intervention=data;
      this.form.patchValue(data); 
        console.log(' intervention created successfully!');
        console.log(this.form.value)
        this.router.navigate(['/list-intervention'])
        this.notifyService.showSuccess("Intervention  ","Bien modifier")
      }) 
    }
    else{
      console.log(this.form.valid);
     
      this.notifyService.showDanger("erreur  ","verifier les champs vide")
    }
}

changeEat(e: any) {
    
 
 
  this.etatin=e.target.value;
 console.log(e.target.value)


 } 

 


Updatestatus(id:string){   
  console.log(this.form2.value);
  if (this.form2.valid){
   
    this.form2.value.interventions=this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.UpdatestatusEnattente( this.form2.value).subscribe((data:any) => {
      this.modalService.dismissAll('done')
      console .log ('piece manque')
      //alert(('piece manque'))
      if(data.action){
      }
    })
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
       this.notifyService.showSuccess("demande de pieces   !!","bien crée")
      }
       )}
      else{
        this.notifyService.showDanger("demande de pieces   !!","verifier les champs vide")
      }
}

}
