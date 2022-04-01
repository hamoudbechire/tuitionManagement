import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { FormBuilder } from '@angular/forms';
export const config = {
  serviceBase: "http://192.168.1.230:1003/",
  //clientId: '',
  //clientSecret: ''
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule], 
  bootstrap: [AppComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    FormBuilder
  ],
})
export class AppModule {}
