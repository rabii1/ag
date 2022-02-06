import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HeaderTitleService } from 'src/app/services/header-title.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Userrole:string="";
  Intervention:any=[];
  Demandeintervention:any=[];
  totalnbIn:any=0;
  nbDe:any=0;
  NBDeTraiter:any=0;
  DemandeTraiter:any=0;
  nbIn:any=0;

  /******* bar chart config  */
  barChartOptions: ChartOptions = {
    responsive: true,
  
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          //     userCallback: function(label, index, labels) {
          //          when the floored value is the same as the value we have a whole number
          //         if (Math.floor(label) === label) {
          //             return label;
          //         }

          //     },
          }
      }],
  },
     
    
  };
  barChartLabels: Label[] = ['En cours', 'Cloturer', 'Supendue par admin', 'Supendue par technicien', 'Bien reçu',  'rejeter','Annuler'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [ ];


  /******** end config  */

  public lineChartType: ChartType = 'line';

  lineChartData: ChartDataSets[]=[] ;

  lineChartLabels: Label[] = ['En cours','Terminer','En attente des pieces','arreter','Suspendue par admin', ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
   

 // count:any;
 
  constructor(private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,private sessionSotragesevice:SessionstorageService) { 


    this.Serviceapibackend.getstatInter().subscribe((data: any) => { 

this.lineChartData=[
  { data: data, label: 'Intervention par type' },
];
this.Serviceapibackend.getstatOrdre().subscribe((data1: any) => { 
  console.log('****************************')

  console.log(data1)
  this.barChartData=[
    { data: data1, label: 'Ordre intervention par type' },
  ];
  
  
      })

    })
  }

  ngOnInit(): void {
    this.loadDemandeintervention();
    this. loadintervention();
    this.ALLDemandeintervention();
    this.Stat()
    this.Userrole = this.sessionSotragesevice.get('UserRole');

    //this.Userrole=this.sessionSotragesevice.get( 'UserRole')
    //alert( this.sessionSotragesevice.get('UserRole'))
    console.log('hello Tableau de bord')
    this.headerTitleService.setTitle('Tableau de bord');
  }

Stat(){

  this.Serviceapibackend.getCountDemande().subscribe((data: any) => {
    
    console.log('service intervention ')
  console.log(data)
//alert(length)
this.nbDe=data.totalD;
this.nbIn=data.totalIn;
this.NBDeTraiter=data.totalTraite;

this.DemandeTraiter=data.demTraite
    console.log(data)
  })
  
}

  loadintervention(){

    this.Serviceapibackend.GETintervention().subscribe((data: {}) => {
      this.Intervention = data;
      console.log('service intervention ')
      //console.log(data.length)
//alert(length)
      console.log(data)
    })
}

loadDemandeintervention(){
  this.Serviceapibackend.getListDemandeInterventionAffected().subscribe((data:any) => {
    this.Demandeintervention =data.demandeintervention;
    //alert(length)

    console.log('servicedemande traiter  intervention affected')
    console.log(this.Demandeintervention)
  })
}

ALLDemandeintervention(){

  this.Serviceapibackend.getinterventions().subscribe((data: {}) => {
    this.Demandeintervention = data;
   

    console.log('service  demande intervention')
    console.log(data)
  })
}
}
