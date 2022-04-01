import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor( private matiereService : MatiereService,
    private router : Router) { }

  ngOnInit() {
    this.matiereService.getAllMatieres().subscribe(
      data => this.dataLoaded = true,
      err => this.errorMessage = err.message
    )
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
        data => {this.matiere = '';
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
  detailMatiere(id){
    this.id = id;  
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
