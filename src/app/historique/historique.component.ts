import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { HeaderTitleService } from '../services/header-title.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  Intervention:any=[];
  intervention:any;
  tableSize = 6;
  tableSizes = [ 3, 6, 12];
  page = 1;
  count = 0;
  constructor(private headerTitleService: HeaderTitleService,private Serviceapibackend: BackendApiService,) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Historique');console.log('Historique')
    this.loadHistory();
  }
  loadHistory(){
  this.Serviceapibackend.getAllHistoryIntervention().subscribe((data:any)=> {
    this.Intervention = data;
    console.log(data)
  })
}
get sortData() {
  return this.Intervention.sort((a:any, b:any) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());
}
onTableDataChange(event:any){
  this.page = event;
  this.loadHistory();
}  

onTableSizeChange(event:any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.loadHistory();
}
}
