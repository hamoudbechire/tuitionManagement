import { Injectable } from '@angular/core';
import { config } from '../app.module';
import { Admin } from '../models/admin';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public url = config.serviceBase+"admins/"
  constructor(private http: HttpClient) { }

  addAdmin(admin: Admin) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url+"add", admin)
            .subscribe(
              data => {
                console.log(data); 
                //this.myuser = data as User;
                resolve(data)},
              error => {console.log(error); reject(error)}
              )}
            )
  }
  uploadIUmageSignup(captureDataUrl, name) {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref();
        console.log('start uploading image');
        // Create a timestamp as filename
        const filename = name + Math.floor(Date.now() / 1000);
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child(`images/${filename}.jpg`);
        imageRef.putString(captureDataUrl, 'data_url', { contentType: 'image/jpg' }).then((snapshot) => {
            console.log('image uploaded');
            // Do something here when the data is succesfully uploaded!
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve(downloadURL);
            });
        }, (err) => {
            console.log('error uploading image');
            console.log(err);

            reject(err);
        });
    });
}
}
