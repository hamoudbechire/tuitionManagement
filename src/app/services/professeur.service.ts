import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Professeur } from '../Models/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  professeurs : Professeur[] = [];
 
  constructor(private http : HttpClient) { }

  getAllProfesseurs(){
    this.http.get<Professeur[]>(config.serviceBase + 'api/proffesseur/').subscribe(
      profs => this.professeurs = profs,
      err => console.log(err)
    );
    return this.http.get<Professeur[]>(config.serviceBase + 'api/proffesseur/')
  }
  getProfesseurById(id){ 
    return this.http.get<Professeur>(config.serviceBase + 'api/proffesseur/' + id)
  }
  addProfesseur(prof : Professeur){ 
    return this.http.post<Professeur>(config.serviceBase + 'api/proffesseur/' , prof)
  }
  deleteProfesseur(id: number){ 
    return this.http.delete(config.serviceBase + 'api/proffesseur/' + id)
  }
}
