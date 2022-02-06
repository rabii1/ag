import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService,) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Notifications');console.log('Notifications')

  }

}
