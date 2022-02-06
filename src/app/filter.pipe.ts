import { Pipe, PipeTransform } from '@angular/core';
import { Equipement } from './equipement.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(equipement: Equipement[], term: string): Equipement[] {
    if(!equipement || ! term ){
      return equipement;
    }  
return  equipement.filter(equipement => {return equipement.libelle.toLowerCase().indexOf(term.toLowerCase())!==-1||
        equipement.numero_serie.toLowerCase().indexOf(term.toLowerCase())!==-1})
  
}

}
