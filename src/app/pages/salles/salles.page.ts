import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.page.html',
  styleUrls: ['./salles.page.scss'],
})
export class SallesPage implements OnInit {

  salles: Observable<any>;

  constructor(
    private salleService: SalleService,
    private router: Router,
    public alertController: AlertController,
    public loginService: LoginService,
    private navCtrl: NavController,
    public nativeStorage: NativeStorage,
    private modalController: ModalController
  ) {

    this.salles = this.salleService.getSalles();
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

  async addSalle(){
    //const modal = await this.modalController.cre
  }

}
