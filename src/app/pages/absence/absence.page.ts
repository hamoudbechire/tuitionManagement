import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { config } from 'src/app/app.module';
import { Absence } from 'src/app/Models/Absence';
import { Etudiant } from 'src/app/Models/Etudiant';
import { AbsenceService } from 'src/app/services/absence.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {

  isChecked = false;
  etudiants : Etudiant[] = [];
  idSeance = 4;
  absence : Absence = new Absence();
  list = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9"];
  constructor(
    private alertController : AlertController,
    private etudiantsService : StudentService,
    private http : HttpClient,
    private absenceService : AbsenceService
  ) 
  { 
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.presentlogOutAllert(this.list)
    }, 4000);
     
    //Date
    var d;
    // while(true) {
    //   d = new Date();
    //   if ((d.getMinutes() == '00') && (d.getSeconds() == '00')){
    //     // my code here
    //   }  
    // }
    d = new Date()
    console.log("Date ", d);
    
  }

  ngOnInit() { 
    //Get All students
    this.etudiantsService.getAllEtudiant().subscribe(
      data => this.etudiants = data 
    ); 
    
    
   // this.presentlogOutAllert(this.list)
  }
  onChange(event, idEtudiant){
    //idSeance
    console.log("event ", event.detail.checked);
    console.log("idEtudiant ", idEtudiant);
    this.absence.etudiantId = idEtudiant;
    this.absence.seanceId = this.idSeance;
    // let a = {
    //   "etudiantId" : 2,
    //   "seanceId" : 4
    // }
    this.absenceService.addAbsence(this.absence).subscribe()
    
  }

  //Alert
  async presentlogOutAllert(list){
    let inputArray = []
    for (let name of list) {
      inputArray.push({
        type: 'checkbox',
        label: name,
        value: name
      })
    }
    console.log("List ", list); 

    const alert = this.alertController.create({
      header : "Select l'Etudiant absent", 
      inputs: inputArray,  
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
              console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Ok',
          handler: (alertData) => { //takes the data 
            console.log(alertData);
          }
        }
      ]
    }); 
    (await alert).present();
  }
}
