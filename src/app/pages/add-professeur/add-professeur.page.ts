import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professeur } from 'src/app/Models/Professeur';
import { ProfesseurService } from 'src/app/services/professeur.service';

@Component({
  selector: 'app-add-professeur',
  templateUrl: './add-professeur.page.html',
  styleUrls: ['./add-professeur.page.scss'],
})
export class AddProfesseurPage implements OnInit {

  id ;
  btn_txt;
  professeur : Professeur = new Professeur();
  constructor(private activedRoute : ActivatedRoute,
    private profeseeurService : ProfesseurService,
    private router : Router
    ) 
  { 
    //console.log('the id', this.activedRoute.snapshot.paramMap.get('id')); 
    this.id = this.activedRoute.snapshot.paramMap.get('id');
    // this.activedRoute.params.subscribe(
    //   par => this.id = par.id
    // );
    // console.log("Id : ", this.id);

    if (this.id != -1) {
      this.btn_txt = "Update Professeur";
      this.profeseeurService.getProfesseurById(this.id).subscribe(
        data => this.professeur = data
      );
      console.log("Yes");
    }
    else {
      this.btn_txt = "Add Professeur";
      console.log("Non");

    }
  }

  ngOnInit() {
  }

  register(form){
    console.log("Form ", form)
    this.profeseeurService.addProfesseur(this.professeur).subscribe(
      data => {
        this.profeseeurService.getAllProfesseurs()
        console.log("This prof " ,this.professeur);
        this.router.navigate(['/professeur/'])
      }
    );
  }
}
