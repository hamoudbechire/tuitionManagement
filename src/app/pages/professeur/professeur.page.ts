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
  
  constructor(private serviceProfesseur: ProfesseurService,
    private router : Router
    ) { }

  ngOnInit() {
    this.serviceProfesseur.getAllProfesseurs().subscribe(
      data => this.DataLoaded = true,
      err => {
        this.errorMessage = err.message;
        //this.errorMessage = this.errorMessage.split(' ')[0]
      }
    )
  }

  AddProfesseur(){
    this.router.navigate(['/add-professeur/-1'])
  }
  UpdateProfesseur(id){
    this.router.navigate(['/add-professeur/'+id])
    console.log("Updated prof : ", id); 
  }
  DeleteProfesseur(id){
    this.serviceProfesseur.deleteProfesseur(id).subscribe(
      data => this.serviceProfesseur.getAllProfesseurs().subscribe()
    )
    console.log("Delete prof : ", id); 
  }
}
