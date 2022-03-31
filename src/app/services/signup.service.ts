import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Admin } from '../models/admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public url = config.serviceBase+"admins/"
  constructor(private http: HttpClient) { }

  addAdmin(admin: Admin) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url+"/add", admin)
            .subscribe(
              data => {
                console.log(data); 
                //this.myuser = data as User;
                resolve(data)},
              error => {console.log(error); reject(error)}
              )}
            )
  }
}
