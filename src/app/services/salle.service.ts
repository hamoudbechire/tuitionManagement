import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { config } from '../app.module';
import { Salle } from '../Models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  url = config.serviceBase+'api/salles';

  constructor( private http: HttpClient) { }

  getSalles() : Observable<Salle[]> {
    return this.http.get<Salle[]>(this.url);
  }
  addSalle (salle: any){
    return this.http.post(this.url+"/add", salle)
    /* .subscribe(
      data => console.log(data),
      error => console.log(error)
    ) */
  }
  deleteSalle(id: number) {
    return this.http.delete(this.url+"/delete/"+id)
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
