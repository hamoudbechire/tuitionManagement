import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MatiereService } from 'src/app/services/matiere.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.page.html',
  styleUrls: ['./matiere.page.scss'],
})
export class MatierePage implements OnInit {

  errorMessage = '';
  dataLoaded = false;
  id = -1;
  matiereName = '';
  imUser = '../../../assets/images/userIm.png';

  matiere = '';
  showInput = false;

  inputSearch ;
  constructor( 
    private matiereService : MatiereService,
    private router : Router 
    ) {  
    }
   
  ngOnInit() {
    this.matiereService.getAllMatieres().subscribe(
      data => this.dataLoaded = true,
      err => this.errorMessage = err.message
    )
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
    this.matiereService.searchMatiere(this.inputSearch);
  }
  //Cancel search
  async onCancel(){
    this.inputSearch = '';
    console.log("onCancel ^^^^^^^^^^^^^^ ");
    //this.myInput = ' ';
    
    //this.myData = this.service.allData;
    this.matiereService.getAllMatieres().subscribe(
      data => {
        //this.service.AddData = data as any;
        console.log("Cancel " , data);
        this.router.navigate(['/matiere/']);
      }
    );
  }

  // bar
  cancel(){
    console.log("Cancel " );
    this.showInput = false;
    //this.router.navigate(['/matiere/']);
  }
  back(){
    this.matiere = '';
    this.showInput = false;
  }
  addMatiere(){
    //this.router.navigate(['/add-professeur/-1'])
    console.log("Add Matiere : "); 
    if(this.matiere != ''){
      let mat = {
        idMatiere : 0,
        nameMatiere : this.matiere
      }
      this.matiereService.addMatiere(mat).subscribe(
        data => {
          this.matiereService.getAllMatieres().subscribe();
          this.matiere = '';
          this.showInput = false;
      },
        err => this.matiere = ''
      );
    }
    else{
      this.showInput = true;
    }
  }
  //show detail from matiere
  detailMatiere(id, name){
    this.id = id;  
    this.matiereName = name;
  }
  updateMatiere(matiere){
    this.id = -1;
    if(this.matiereName != ''){
      matiere.nameMatiere = this.matiereName;
    }
    this.matiereService.addMatiere(matiere).subscribe(
      data => this.matiereName = ''
    )
    //this.router.navigate(['/add-professeur/'+id])
    console.log("Updated Matiere : ", matiere); 
  }
  deleteMatiere(id){
    this.matiereService.deleteMatiere(id).subscribe(
      data => this.matiereService.getAllMatieres().subscribe(
        data => console.log("Delete prof : ", id)
      )
    )
    
  }
}
