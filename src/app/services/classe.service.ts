import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.module';
import { Classe } from '../Models/Classe';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  classes : Classe[]= [];
  constructor(private http : HttpClient) { }
 
  getAllClasse() {
    
    this.http.get<Classe[]>(config.serviceBase + 'api/classe/list' ).subscribe(
      classes => this.classes = classes,
      err => console.log(err));
      return this.http.get<Classe[]>(config.serviceBase + 'api/classe/list' )
  }
  
  getClasseById(id: number) {
    return this.http.get<Classe>(config.serviceBase + 'api/classe/' + id);
  }

  createClasse(classe: Classe) {
    return this.http.post(config.serviceBase+ 'api/classe/post', classe);
  }

  updateClasse(classe: Classe) {
    return this.http.put(config.serviceBase + 'api/classe/put/' + classe.classeId, classe);
  }

  deleteClasse(id: number) {
    return this.http.delete<Classe>(config.serviceBase + 'api/classe/delete/' + id);
  }
  
 

}
