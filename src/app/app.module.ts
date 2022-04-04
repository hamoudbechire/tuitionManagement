import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { FormBuilder } from '@angular/forms';

export const config = {
  serviceBase: "http://192.168.1.230:1003/", //"http://192.168.1.243:1008/api/",
  clientId: 'school-management',
  clientSecret: 'Hmd123'
}
export const firebaseConfig = {
  apiKey: "AIzaSyAFZI8joTuquaEJouw04qM91g0MpenEGNI",
  authDomain: "schoolmanagement-f62f5.firebaseapp.com",
  projectId: "schoolmanagement-f62f5",
  storageBucket: "schoolmanagement-f62f5.appspot.com",
  messagingSenderId: "85336488198",
  appId: "1:85336488198:web:cf8b594239f48aadec0687",
  measurementId: "G-7574VH2ZNN"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule], 
  bootstrap: [AppComponent],
  providers: [
   { 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
   },
   Camera, 
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    FormBuilder
  ],
})
export class AppModule {}
