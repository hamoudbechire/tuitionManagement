import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  imUser = '../../../assets/images/userIm.png';
  constructor() {
    firebase.initializeApp(firebaseConfig)
  }
}
