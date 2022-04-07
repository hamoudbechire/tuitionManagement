import { Admin } from './../../models/admin';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { SignupService } from 'src/app/services/signup.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; 
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
//import { cfaSignIn, cfaSignInPhone, cfaSignInPhoneOnCodeReceived, cfaSignInPhoneOnCodeSent } from 'capacitor-firebase-auth';
//import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public isWebAuth = false
  public captureDataUrl: any = '';
  public showIcon = true;
  public signup_form: FormGroup;
  public matching_passwords_group: FormGroup;
  public admin: Admin = new Admin();
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off-outline';

  constructor(
    public fromBuilder: FormBuilder,
    private signupService: SignupService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,

  ) {
    this.formValidation();
    //this.validation_messages
  }

  validation_messages = {
    'firstName': [
      { type: 'required', message: "first name" }
    ],
    'lastName': [
      { type: 'required', message: "last name" }
    ],
    'phone': [
      { type: 'required', message: "phone" }
    ],
    'email': [
      { type: 'required', message: "respect le syntax d' email" },
    ],
    'password': [
      { type: 'required', message: "password requered" },
      { type: 'minlength', message: "length problem" },
      { type: 'pattern', message: "pattern" }
    ],
    'confirm_password': [
      { type: 'required', message: "confirm password" }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: "password not compatible" }
    ]
  };

  ngOnInit() {
  }

  async selectImage(){
    const actionSheet = await this.actionSheetController.create({
      header: "selectImageSource",
      buttons: [{
        text: "loadFromLibrary",
        handler: () => {
          this.getImageFromLibrary(0);
        }
      },
      {
        text: "useCamera",
        handler: () => {
          this.getImageUsingCamera();
        }
      },
      {
        text: "Cancel",
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  signup(){
    this.admin.phone = "+222"+this.admin.phone; 
    this.admin.isActivated = false; 
    if (this.captureDataUrl == '' || this.captureDataUrl == null) {
      this.admin.profilImageUrl = "";
      console.log(this.admin);

      console.log("add admin without img")
      this.signupService.addAdmin(this.admin).then(data => console.log(data));
    }else{
      this.signupService.uploadIUmageSignup(this.captureDataUrl, this.admin.phone).then(
        mediaData => {
          this.admin.profilImageUrl = mediaData as string;
          console.log(this.admin);
          
          console.log("add admin with img");
          this.signupService.addAdmin(this.admin).then(data => console.log(data));
        },
        err => console.log(err)
      )
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }
  getImageUsingCamera() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
        this.showIcon = false;
      }, (err) => {
        //console.log(err);
      });
  }
  getImageFromLibrary(sourceType) {
    const cameraOptions: CameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };
    this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
        this.showIcon = false;
      }, (err) => {
        console.log(err);
      });
  }
  formValidation(){
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required,])),
      confirm_password: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required,]))
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
    this.signup_form = this.fromBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,11}$')]),
      matching_passwords: this.matching_passwords_group,
    });
  }

}
