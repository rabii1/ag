import { Pipe, PipeTransform } from '@angular/core';
import { PiecesRechange } from './pieces-rechange.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
/*   transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */
  
  transform(pieces: PiecesRechange[], SearchTerm: string): PiecesRechange[] {
    if(!pieces || ! SearchTerm ){
      return pieces;
    }  
//return pieces.filter(pieces=>pieces.nom_piece.toLowerCase().indexOf(SearchTerm.toLowerCase())!==-1) || pieces.filter(pieces=>pieces.ref_piece.toLowerCase().indexOf(SearchTerm.toLowerCase())!==-1);

return  pieces.filter(pieces => {return pieces.nom_piece.toLowerCase().indexOf(SearchTerm.toLowerCase())!==-1|| pieces.ref_piece.toLowerCase().indexOf(SearchTerm.toLowerCase())!==-1})

}
}
