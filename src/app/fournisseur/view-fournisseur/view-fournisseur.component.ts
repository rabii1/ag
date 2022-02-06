import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/fournisseur.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-view-fournisseur',
  templateUrl: './view-fournisseur.component.html',
  styleUrls: ['./view-fournisseur.component.css']
})
export class ViewFournisseurComponent implements OnInit {
  id: any;
  fournisseur :any= Fournisseur;
   
  constructor(
    private Serviceapibackend: BackendApiService,
    private router: Router, 
    private route: ActivatedRoute,
   ) {  
    
    }
  
  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getFournisseurById(id).subscribe((data: Fournisseur) => {
      console.log(data);
      this.fournisseur = data;  })
}
}
