import { Injectable } from '@angular/core';
import { SessionStorageModel } from './SessionStorageModel';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  sessionStorageModel:any =new SessionStorageModel();

  constructor() { }

 // Enregistrer des données dans sessionStorage

  public set(key: string  , value: any) {

    this.sessionStorageModel[key] = value;

  }
  // Récupérer des données depuis sessionStorage


  get(key: string ): string {

    return this.sessionStorageModel[key]
    
  }

// Supprimer des données de sessionStorage

  remove(key: string) {

    this.sessionStorageModel[key] = "vide";

  }
  // Supprimer toutes les données de sessionStorage

  clear() {

    this.sessionStorageModel = new SessionStorageModel();
    
  }
}
