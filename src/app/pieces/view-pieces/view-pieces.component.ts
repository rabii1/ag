import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiecesRechange } from 'src/app/pieces-rechange.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-view-pieces',
  templateUrl: './view-pieces.component.html',
  styleUrls: ['./view-pieces.component.css']
})
export class ViewPiecesComponent implements OnInit {
  id: any;
  pieceRechange :any= PiecesRechange;
  constructor(private Serviceapibackend: BackendApiService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.Serviceapibackend.getPiecesRechangeById(id).subscribe((data: PiecesRechange) => {
      console.log(data);
      this.pieceRechange = data;  })
  }
}
