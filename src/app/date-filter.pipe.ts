import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  // transform(row: any, d1: Date, d2?: Date): any {
  //   d1.toString().length == 0 ? d1 = new Date() : d1;
  //   d2 == null ? d2 = new Date() :d2; 
  //   if (d1 >= d2 || d1 == null) { return row;}
  //   return row.filter(x=>{return  new Date(x.fecha) >= new Date(d1) && new Date(x.fecha) <= new Date(d2)});   
  // }
    transform(row: any,d1: Date,d2: Date): any {

const resultaFiltre = [];
let date1=(moment(new Date(d1)).format ('MM-DD-YYYY HH:mm'))
//let date1 = new Date(d1);
let date2=(moment(new Date(d2)).format ('MM-DD-YYYY HH:mm'))
//let date2 = new Date(d2);
// if it is less than the end date
if (d1 >= d2 || d1 == null) {
  return row;
}
// if the end date argument is invalid, it is set to the current date
if (d2 == null) {
  d2 = new Date();
}
// if both arrangements are correct then the new arrangement is created
for (const filteredRow of row) {
  console.log("***********objett*************")
  console.log(filteredRow);
  let a = new Date(filteredRow.date);
  //console.log("date filtre :",filteredRow.date)
   console.log(moment(new Date(filteredRow.date)).format('LL'));


  //moment(a).format(' DD-MM-YYYY,mm:ss a ')
  moment(a).format('MM-DD-YYYY HH:mm')
  console.log(moment(a).format(' MM-DD-YYYY HH:mm'));

  console.log("******dateee MM-DD-YYYYY*****")

  console.log("******dateee*****")
  console.log(moment(a).format('MM-DD-YYYY HH:mm'));
  if (moment(a).format('MM-DD-YYYY HH:mm') > moment(date1).format('MM-DD-YYYY HH:mm') && moment(a).format('MM-DD-YYYY HH:mm')<=moment(date2).format('MM-DD-YYYY HH:mm')) {
  //if (a > date1 && a <= date2) {
   //console.log("date tab : "+a+" - "+date1+' - '+date2 );
    
    console.log("date tab : "+moment(a).format('MM-DD-YYYY HH:mm')+" - "+moment(date1).format('MM-DD-YYYY HH:mm')+' - '+moment(date2).format('MM-DD-YYYY HH:mm') );
    console.log('*******   filteredRow     **********')
    console.log(filteredRow)

    resultaFiltre.push(filteredRow);
  }
}
return resultaFiltre;
  }
}
