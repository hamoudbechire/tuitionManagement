import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Professeur } from '../Models/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  professeurs : Professeur[] = [];
  dataSearch = []
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
  searchProfesseeur(name : string) {
    var listData = [];
    //this.haveData = false;
    //this.allData = this.http.get<any[]>(this.getApiUrl);
    this.http.get(config.serviceBase +'api/proffesseur/' ).subscribe(
      data =>{
        var i = 0;
        console.log("Data service ", data);
        console.log("firstName data 0 ",data[0].firstName);
        while(data){
          console.log("firstName data 0 ",data[0].firstName);
          var firstName = data[i].firstName;
          console.log("defaultValue ",firstName);
          if(firstName.search(name) != -1){
            //this.haveData = true;
            listData.push(data[i]) ;
          }
          i = i + 1 ;
        }
      }
    );
    this.professeurs = [];
    this.professeurs = listData;
  }
}
