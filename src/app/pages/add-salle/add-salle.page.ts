import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Salle } from 'src/app/Models/salle';

@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.page.html',
  styleUrls: ['./add-salle.page.scss'],
})
export class AddSallePage implements OnInit {

  id: number;
  salle: Salle = new Salle();
  salle_form: FormGroup;

  constructor(
    private modalController: ModalController,
    public fromBuilder: FormBuilder,
    
    ) { 
      this.salle_form = this.fromBuilder.group({
        numsalle: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
  }

  dismiss() {  
    this.modalController.dismiss();
  }

  addSalle(){
    console.log(this.salle_form.valid);
    console.log(this.salle);
  }

}
