import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { config } from '../app.module';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authentication = {
    isAuthenticated: false,
    userName: '',
    token: '',
    useRefreshTokens: '',
  };
  public admin: Admin = new Admin();

  constructor(
    private navCtrl: NavController,
    private httpClient: HttpClient,
    public nativeStorage: NativeStorage
  ) {}

  async logOut() {
  }
  async login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      var userData =
        'grant_type=password' +
        '&username=' +
        "222"+username +
        '&password=' +
        password /* +
        '&client_id=' +
        config.clientId +
        '&client_secret=' +
        config.clientSecret; */
      console.log(userData);
      
      this.httpClient
        .post(config.serviceBase + 'token', userData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .subscribe(
          (response) => {
            console.log('Auth informations >>>>>>>>>>>> : ', response);
            let userName = response['userName'];
            console.log(response['access_token']);
            this.authentication.useRefreshTokens = response['refresh_token'];
            this.authentication.token = response['access_token'];
            this.authentication.isAuthenticated['true'];
            this.setAuthentificatedUser();

            this.httpClient
              .get(`${config.serviceBase}api/admins/findAdmin/${userName}`)
              .subscribe(
                async (response) => {
                  let userLoged: Admin = new Admin();
                  userLoged = response as Admin;
                  console.log('user loged is : ', userLoged);
                  this.admin = response as Admin;
                  this.authentication.isAuthenticated = true;
                  this.authentication.userName = response['firstName'];
                  this.setCurrentUser(this.admin, this.authentication);
                  resolve(response);
                },
                (err) => {
                  console.error('Error logging in: ', err);
                  reject(err);
                }
              );
          },
          (err) => {
            console.log('Login failed >>>>>>>>>>>>> : ', err);
            reject(err);
          }
        );
    });
  }
  setCurrentUser(user: Admin, authentication: any) {
    localStorage.setItem("authenticated", 'true')
    this.nativeStorage.setItem('authentication', { user: user, authentication: authentication }).then(
        () => console.log('Stored currentUser!'),
        error => console.error('Error storing item', error)
    );
  }
  setAuthentificatedUser() {
    localStorage.setItem('currentUser', 'loggedin');
  }
}
