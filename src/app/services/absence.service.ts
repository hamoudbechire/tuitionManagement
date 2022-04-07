import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Absence } from '../Models/Absence'; 

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  absences : Absence[] = [];
  
  constructor(private http : HttpClient) { }
 
  getAllAbsences(){
    this.http.get<Absence[]>(config.serviceBase + 'api/absence/').subscribe(
      absences => this.absences = absences,
      err => console.log(err)
    );
    return this.http.get<Absence[]>(config.serviceBase + 'api/absence/')
  }
  getAbsenceById(id){ 
    return this.http.get<Absence>(config.serviceBase + 'api/absence/' + id)
  }
  addAbsence(absence : Absence){ 
    return this.http.post<Absence>(config.serviceBase + 'api/absence/' , absence)
  }
  deleteAbsence(id: number){ 
    return this.http.delete(config.serviceBase + 'api/absence/' + id)
  }
}
