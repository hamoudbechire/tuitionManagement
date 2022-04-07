import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesseurService } from 'src/app/services/professeur.service';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.page.html',
  styleUrls: ['./professeur.page.scss'],
})
export class ProfesseurPage implements OnInit {

  DataLoaded : boolean = false;
  errorMessage = '';
  imUser = '../../../assets/images/userIm.png'
  
  inputSearch ="";
  constructor(private serviceProfesseur: ProfesseurService,
    private router : Router
    ) { }

  ngOnInit() {
    this.serviceProfesseur.getAllProfesseurs().subscribe(
      data => {
        this.DataLoaded = true;
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.message;
        //this.errorMessage = this.errorMessage.split(' ')[0]
      }
    )
  }

  test(){
    console.log("Test ....");
    
  }
   //Refrech
   doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  //search 
  onInput($event){
    // this.inputSearch += $event.detail.data;
    // console.log("Event search ", $event.detail.data);
    // console.log("Mot search ", this.inputSearch);
    // await this.serviceProfesseur.searchProfesseeur(this.inputSearch) 

    // Reset items back to all of the items
    var val = $event.target.value;
    this.inputSearch = val;
    console.log('input ', val);
    console.log('input item ',  val.trim());
    this.serviceProfesseur.searchProfesseeur(this.inputSearch);
  }
  //Cancel search
  async onCancel(){
    this.inputSearch = '';
    console.log("onCancel ^^^^^^^^^^^^^^ ");
    //this.myInput = ' ';
    
    //this.myData = this.service.allData;
    this.serviceProfesseur.getAllProfesseurs().subscribe(
      data => {
        //this.service.AddData = data as any;
        console.log("Cancel " , data);
        this.router.navigate(['/professeur/']);
      }
    );
  }

  addProfesseur(){
    this.router.navigate(['/add-professeur/-1'])
  }
  updateProfesseur(id){
    this.router.navigate(['/add-professeur/'+id])
    console.log("Updated prof : ", id); 
  }
  deleteProfesseur(id){
    this.serviceProfesseur.deleteProfesseur(id).subscribe(
      data => this.serviceProfesseur.getAllProfesseurs().subscribe()
    )
    console.log("Delete prof : ", id); 
  }
}
