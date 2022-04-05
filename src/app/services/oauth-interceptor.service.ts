import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './login.service'
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    //private authentication: any

    constructor
    (
        public serviceAuth: LoginService,
        public router: Router,
        public toastController: ToastController,
        public nativeStorage: NativeStorage,

    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.serviceAuth.authentication && this.serviceAuth.authentication.token) {
            console.log("token in inspect function : " ,this.serviceAuth.authentication.token);
            
            request = request.clone({
                headers: request.headers.set(
                    'Authorization', 'Bearer ' + this.serviceAuth.authentication.token)
            });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //alert('inside map event--->>>' + JSON.stringify(event));
                }
                return event;
            }), catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.presentToast('Login failed');
                    } else {
                        this.serviceAuth.logOut();
                        //this.router.navigate(['login']);
                    }
                }
                this.serviceAuth.logOut();
                return throwError(error);
            })
        );
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
}