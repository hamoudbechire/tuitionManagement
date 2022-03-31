import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Matiere } from '../Models/Matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  matieres : Matiere[] = [];
  
  constructor(private http : HttpClient) { }

  getAllMatieres(){
    this.http.get<Matiere[]>(config.serviceBase + 'api/matiere/').subscribe(
      matieres => this.matieres = matieres,
      err => console.log(err)
    );
    return this.http.get<Matiere[]>(config.serviceBase + 'api/matiere/')
  }
  getMatiereById(id){ 
    return this.http.get<Matiere>(config.serviceBase + 'api/matiere/' + id)
  }
  addMatiere(prof : Matiere){ 
    return this.http.post<Matiere>(config.serviceBase + 'api/matiere/' , prof)
  }
  deleteMatiere(id: number){ 
    return this.http.delete(config.serviceBase + 'api/matiere/' + id)
  }
}
