import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService,) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Statistique');console.log('comp Statistique')

  }


}
