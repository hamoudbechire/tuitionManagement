import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Models/Etudiant';
import { EtudiantService } from 'src/app/services/student.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-etudiant',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  
  etudiants: Etudiant[];

  constructor( private router : Router, private etudiantService: EtudiantService) { }

  ngOnInit() {
    this.etudiantService.getAllEtudiant()
      .subscribe( data => {
        this.etudiants = data;
      });
  }

  deleteEtudiant(etudiant: Etudiant): void {
    this.etudiantService.deleteEtudiant(etudiant.etudiantId)
      .subscribe( data => {
        this.etudiants = this.etudiants.filter(u => u !== etudiant);
      })
  };

  editEtudiant(etudiant: Etudiant): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", etudiant.etudiantId.toString());
    this.router.navigate(['etudiant']);
  };

  newEtudiant(){
    this.router.navigate(['addetudiant'])

  };



}
