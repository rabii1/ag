import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {
  // public title=new Subject<any>();
  title = new BehaviorSubject('Initial Title');
  // title1=new BehaviorSubject('Initial Title');
  constructor() { }

  setTitle(title: string) {
    this.title.next(title);
  }
  
  getTitle():Observable<any> {
    return this.title.asObservable();
    //this.title.getTitle();
}
// clearTiltle(){
//   this.title.next()
// }
}
