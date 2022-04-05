
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { ToastController, Platform } from '@ionic/angular';
import { ConnectionStatus } from '../models/enums';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.initializeNetworkEvents();
    let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
    this.status.next(status);
  }

  public getSatus() {
    return this.network.type;
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      console.log("testConnect1");
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      console.log("testConnect");
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });

  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    let connectionStatus = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    console.log(connectionStatus);
    
    let toast = this.toastController.create({
      message: `You are now ${connectionStatus}`,
      duration: 3000,
      position: 'bottom'
    });

    toast.then(toast => toast.present());
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
  displayToast(msg){
    let colorToast='danger'
    let toast = this.toastController.create({
      message: `${msg}`,
      duration: 3000,
      position: 'bottom',
      color:colorToast
    });
    toast.then(toast => toast.present());
  }
}
