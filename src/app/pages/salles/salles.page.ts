import { AddSallePage } from './../add-salle/add-salle.page';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { SalleService } from 'src/app/services/salle.service';
import { Salle } from 'src/app/Models/salle';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.page.html',
  styleUrls: ['./salles.page.scss'],
})
export class SallesPage implements OnInit {

  salles: Salle[] = [];
  openFormAdd = false;
  salle: Salle = new Salle();

  constructor(
    private salleService: SalleService,
    public alertController: AlertController,
    public loginService: LoginService,
    private navCtrl: NavController,
    public nativeStorage: NativeStorage,
    private modalController: ModalController,

  ) {
    this.salleService.getSalles().subscribe(
      data => {this.salles = data; console.log(data);
      }
    )
    console.log(this.salles);
    
   }

  ngOnInit() {
  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      subHeader: 'suppression de salle',
      message: 'Voulez vous supprimer cet salle ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            console.log('suppression annuleé');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.deleteSalle(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteSalle(id: number) {
    this.salleService.deleteSalle(id);
  }

  editSalle(salle: any) {
    console.log(salle);
    /* let navigationExtras: NavigationExtras = {
      queryParams: {
        emp: JSON.stringify(employe)
      }
    };
    this.router.navigate(['nav/addemploye'], navigationExtras); */
  }

  logOut() {
    this.loginService.logOut();
    this.navCtrl.navigateRoot("/login");
  }

  
  async addSalle() {
    /* const modal = await this.modalController.create({
      component:  AddSallePage,
      componentProps: {}
    });
    modal.onDidDismiss().then((data) => {
      modal.dismiss();
    });
    return await modal.present(); */
    this.openFormAdd = false
    this.salle.libre = true;
    console.log(this.salle);
    this.salle.numSalle && this.salle.numSalle !== "" 
    ? this.salleService.addSalle(this.salle).subscribe(
      data => this.salles.push(data as Salle),  
      err => console.log(err)
    
    )
    : alert("Num de salle Obligatoire");
    
    

  }
}
