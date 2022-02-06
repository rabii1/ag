import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Demandeintervention } from 'src/app/demandeintervention.model';
import { NotificationService } from 'src/app/notification.service';
import { Ordreintervention } from 'src/app/ordreintervention.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-list-ordre-intervention',
  templateUrl: './list-ordre-intervention.component.html',
  styleUrls: ['./list-ordre-intervention.component.css']
})
export class ListOrdreInterventionComponent implements OnInit {
  closeModal:any ;
  id:any;
  form: any = FormGroup;
  // Ordreintervention:any=[];
  // ordreintervention:any=Ordreintervention;
  ordreintervention:any;
  Ordreintervention:any=[];
  @Input() ordre = { etat: '',date:'', degre_urgence: ''}
  datatableElement: any = DataTableDirective;
  row:any;
  d1:any
  Min:any;
  Max:any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [ 6, 9, 12];
  term:any;
  public ordreFilter: any = '';
  selected:any;
  myDropDown:any
  EtatFilter = ['rejetee','initiale','bien reçu','annuler','suspenduTech','cloturer','valider','en cours'];
  selectList:any;
  filterText:any
  public selectedItem: any;
  demandeintervention:any=Demandeintervention;
  i:any
  Ishide:boolean=false;
  public show_div : boolean = false;
  public button_name : any = 'Filtres';
  error:boolean=false;
  Userrole:string="";
  click : boolean = true;


  constructor(private sessionSotragesevice:SessionstorageService,private actRoute: ActivatedRoute,private router: Router,private notifyService : NotificationService,private headerTitleService: HeaderTitleService,private route: ActivatedRoute,private formBuilder: FormBuilder,private Serviceapibackend: BackendApiService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.Userrole = this.sessionSotragesevice.get('UserRole');

    this.error=true;
    
    this.Ishide=true;

    this.headerTitleService.setTitle(' Ordre Intervention');console.log('Ordre intervention')

    this.Serviceapibackend.getOrdre().subscribe((data: any) => {
      this.ordre = data;
      console.log('ordre works');
      console.log('================');
      console.log(this.ordre); });
    

    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getOrdreintervention(id).subscribe((data: Ordreintervention) => {
      this.ordreintervention = data; 
   
    console.log(data)

      console.log('get Ordreintervention by id');

      console.log(data);
      
     }) 
    this.form = this.formBuilder.group({
      etat: ['', Validators.required],
      date: ['', Validators.required],
      degre_urgence: ['', Validators.required],
    })
    this.loadOrdreintervention();
  }

/************ Filtre button hide**************/
showToasterSuccess(){
  this.notifyService.showSuccess("","Lancer une intervention")
}
toggle() {
  this.show_div = !this.show_div;

  // CHANGE THE TEXT OF THE BUTTON.
  if(this.show_div) 
    this.button_name = "Filtres";
  else
    this.button_name = "Filtres";
}

/************* filtre selecte search ****************/
  
  loadOrdreintervention(){

    this.Serviceapibackend.AllOrdre().subscribe((data: {}) => {
      this.Ordreintervention = data;
      console.log('ordre intervention demande')
      console.log(data)
     })
      
  }
  /***  */
 
  submit(){
    console.log(this.form.value);
  }
  get sortData() {
    return this.Ordreintervention.sort((a:any, b:any) => new Date(b.debutprevu).getTime() - new Date(a.debutprevu).getTime());


  }


  deleteIntervention(){
    this.Serviceapibackend.deleteordreintervention(this.id).subscribe(data => {
      this.loadOrdreintervention()
    })
  
  }
  triggerModalView(content:any,id:any) {
    this.id=id;
    console.log("msggggg")
    //var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getOrdreintervention(id).subscribe((data: Ordreintervention) => {
      this.ordreintervention = data; 
     // this.ordreintervention = data.demandeinterventions;
      data.demandeintervention=data.demandeintervention;
 
      // data.equipement=data.equipement;
      //data.techniciens=data.techniciens;
      data.intervention=data.intervention;

      console.log('get Ordreintervention by id');

      console.log(data);
     }) 

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass : "myCustomModalClass"}).result.then((res) => {
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
  changePanne(e: any) {
    this.form.patchValue({panne: e.target.value});
    console.log("change");
   
    console.log(e.target.value)
  }
  get f() {
    return this.form.controls;


  }
    // format date in typescript
 getFormatedDate(date: Date, format: string) {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, format);
} 

onTableDataChange(event:any){
  this.page = event;
  this.loadOrdreintervention();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.loadOrdreintervention();
}

AnuulerOrdre(id:string,idordre:string){
 // this.form.value.demandeintervention=this.route.snapshot.paramMap.get('id')
  this.Serviceapibackend.ChangeEtat(id,idordre,'annuler',this.form.value.description).subscribe((data:any) =>{
   //alert("annuler")
      console.log(data) 
       if(data.action){
        this.form.value.description=""
    this.modalService.dismissAll('done')
  }
  })

}
lancerNvOrdre(){
  this.modalService.dismissAll('done')

}
onButtonClick(){
  this.modalService.dismissAll('done')

  this.click = !this.click;
}
// Valider(){
//   this.form.value.demandeintervention=this.route.snapshot.paramMap.get('id');
//   this.Serviceapibackend.UpdateEtat(this.id,'valider',this.form.value.description).subscribe((data:any) => {
//     alert("valider")
//     console.log(data) 
//     if(data.action){
//       this.form.value.description=""

//       console.log(data)
//       this.modalService.dismissAll('done')
//     }
//   })
// }
changeetat(id:string){
  this.demandeintervention=this.route.snapshot.paramMap.get('id');
  this.Serviceapibackend.Updatestatus(id,this.id,'reinialiser','').subscribe((data:any) => {
    alert("reinialiser demande")
    this.modalService.dismissAll('done')
    console.log(data) 
    if(data.action){
      console.log(data)
 

    }
  }) 
}

}

