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

  searchMatiere(name : string) {
    var listData = [];
    //this.haveData = false;
    //this.allData = this.http.get<any[]>(this.getApiUrl);
    this.http.get(config.serviceBase +'api/matiere/' ).subscribe(
      data =>{
        var i = 0;
        console.log("Data service ", data);
        console.log("Name data 0 ",data[0].nameMatiere);
        while(data){
          console.log("firstName data 0 ",data[0].nameMatiere);
          var nameMatiere = data[i].nameMatiere;
          console.log("defaultValue ",nameMatiere);
          if(nameMatiere.search(name) != -1){
            //this.haveData = true;
            listData.push(data[i]) ;
          }
          i = i + 1 ;
        }
      }
    );
    this.matieres = [];
    this.matieres = listData;
  }
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
