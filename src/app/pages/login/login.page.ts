import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup
  public phone = "";
  public password = "";
  authFld = false

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private networkService: NetworkService,
    private loginService: LoginService

  ) { 
    this.loginForm = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8,11}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    })
  }

  ngOnInit() {
  }

  login(){
    console.log("login");

    if(this.loginForm.valid && this.networkService.getCurrentNetworkStatus() == 0){
      this.loginService.login(this.phone, this.password).then(
        success => {
         console.log(success)
         this.navCtrl.navigateRoot("nav/employe");
        },
        error => {
         console.log("error")
         this.authFld = true
       }
     )
    }
    
  }

}
