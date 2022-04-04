import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.module';
import { Etudiant } from '../Models/Etudiant';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  
  constructor(private http : HttpClient) { }
  baseUrl: string = 'http://localhost:55420/api/etudiant';
  getAllEtudiant() {
    
    return this.http.get<Etudiant[]>(config.serviceBase + 'api/etudiant/list' );
  }
  
  getEtudiantById(id: number) {
    return this.http.get<Etudiant>(config.serviceBase + 'api/etudiant/' + id);
  }

  createEtudiant(etudiant: Etudiant) {
    return this.http.post(config.serviceBase+ 'api/etudiant/add', etudiant);
  }

  updateEtudiant(etudiant: Etudiant) {
    return this.http.put(config.serviceBase + 'api/etudiant/update/' + etudiant.etudiantId, etudiant);
  }

  deleteEtudiant(id: number) {
    return this.http.delete<Etudiant>(config.serviceBase + 'api/etudiant/delete/' + id);
  }
  
 

}
