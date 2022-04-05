import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/Models/Etudiant';
import { ClasseService } from 'src/app/services/classe.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  

  constructor(private formBuilder: FormBuilder,private router: Router, private studentService : StudentService, private classeService : ClasseService) { }
  updateForm : FormGroup;
  etudiant : Etudiant;
  inputSelect ;
  ngOnInit() {
    let etudiantId = localStorage.getItem("editEtudiantId");
    if(!etudiantId) {
      alert("Invalid action.")
      this.router.navigate(['etudiant']);
      return;
    }
    this.classeService.getAllClasse().subscribe();
    this.updateForm = this.formBuilder.group({
      id : [],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      phone : ['', Validators.required],
      classeId : ['', Validators.required]
    });
    this.studentService.getEtudiantById(+etudiantId)
    .subscribe( data => {
      this.updateForm.setValue(data);
    });
  }

  onSubmit() {
    let etudiant = this.updateForm.value
    etudiant.classeId = this.inputSelect;
    this.studentService.updateEtudiant(etudiant)
      .subscribe( data => {
        this.router.navigate(['etudiant']);
      });
  }

}
