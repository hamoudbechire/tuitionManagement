import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/Models/Etudiant';
import { StudentService } from 'src/app/services/student.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  
  etudiants: Etudiant[];

  constructor( private router : Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getAllEtudiant()
      .subscribe( data => {
        this.etudiants = data;
      });
  }

  deleteEtudiant(etudiant: Etudiant): void {
    this.studentService.deleteEtudiant(etudiant.etudiantId)
      .subscribe( data => {
        this.etudiants = this.etudiants.filter(u => u !== etudiant);
      })
  };

  editEtudiant(id){
    this.router.navigate(['edit-student/'+id])
    console.log("Updated prof : ", id); 
  }

  newEtudiant(){
    this.router.navigate(['add-student'])

  };

  
  


}
