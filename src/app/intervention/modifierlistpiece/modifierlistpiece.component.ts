import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-modifierlistpiece',
  templateUrl: './modifierlistpiece.component.html',
  styleUrls: ['./modifierlistpiece.component.css']
})
export class ModifierlistpieceComponent implements OnInit {
 
  form2:any= FormGroup;
  id:any;
  intervention:any;
  Userrole:string="";
  idTechnicien:string="";
  PiecesRechange:any=[]
  dropdownList:any = [{item_id: "",item_text: ""}];
  Usertel:string="";
  Useradresse:string="";
  
  constructor(private actRoute: ActivatedRoute,private notifyService : NotificationService,private route: ActivatedRoute,
  private router: Router,private formBuilder: FormBuilder,
  private sessionSotragesevice:SessionstorageService,private Serviceapibackend: BackendApiService) { 
   
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.Usertel=this.sessionSotragesevice.get( 'UserTel') ;
    this.idTechnicien= this.sessionSotragesevice.get('UserId');
  
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
    this.Serviceapibackend.getintervention(id).subscribe ( (data:any) => { 
      console.log(data)
      this.intervention=data; 
      this.form2 = this.formBuilder.group({

        quantite:this.formBuilder.array([]),

        })
 
          this.Initquantitepiece(data.demandepieces)

    })           
  }
  /****** Array list quantite piece *******/



Initquantitepiece(listpiece:any) {

  console.log("rrrrrrrrrrrrrrrrrrr")
  console.log(listpiece)
    var x= this.form2.get('quantite') as FormArray ;
  
    for (let i = 0; i < listpiece.length; i++) {
      const el = listpiece[i];
      
    x.push(this.formBuilder.group({
      quantite:el.quantite,
      piece:el.piece,
    })) 
  
    }
  
  }
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

  submit(){

    if (this.form2.valid){
      console.log(this.form2.value )

      this.form2.value.intervention=this.route.snapshot.paramMap.get('id');
      this.Serviceapibackend.updateDemandepiece(this.form2.value).subscribe(res => {
         console.log('demande de pieces updated successfully!');
         console.log(this.form2.value )
         this.router.navigate(['/list-intervention'])
  
         this.notifyService.showSuccess("demande de pieces   !!"," bien Modifiée ")
        }
         )}
        else{
          this.notifyService.showDanger("demande de pieces   !!","verifier les champs vide")
        }
  }
  
}
