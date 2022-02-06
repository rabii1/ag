import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipement } from 'src/app/equipement.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-view-equipement',
  templateUrl: './view-equipement.component.html',
  styleUrls: ['./view-equipement.component.css']
})
export class ViewEquipementComponent implements OnInit {
  id: any;
  equipement :any= Equipement;
  constructor(private Serviceapibackend: BackendApiService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getEquipementById(id).subscribe((data: Equipement) => {
      console.log(data);
      this.equipement = data;
     })
  }
}
