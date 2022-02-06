import { Pipe, PipeTransform } from '@angular/core';
import { Ordreintervention } from './ordreintervention.model';

@Pipe({
  name: 'ordreFilter'
})
export class OrdreFilterPipe implements PipeTransform {

  transform(ordre: Ordreintervention[], term: string): Ordreintervention[] {
    if(!ordre || ! term ){
      return ordre;
    }  
//return equipement.filter(equipement=>equipement.libelle.toLowerCase().indexOf(term.toLowerCase())!==-1) ||  equipement.numero_serie.toLowerCase().indexOf(term.toLowerCase())!==-1 ;
return  ordre.filter(ordre => {return ordre.etat.toLowerCase().indexOf(term.toLowerCase())!==-1})
  
}

}
