import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/Models/Etudiant';
import { ClasseService } from 'src/app/services/classe.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  updateForm : FormGroup;
  etudiant : Etudiant;
  id;
  inputSelect ;

  constructor(private formBuilder: FormBuilder,private router: Router, private studentService : StudentService, private classeService : ClasseService, private activedRoute : ActivatedRoute) 
  { this.id = this.activedRoute.snapshot.paramMap.get('id'); }
 
  
  ngOnInit() {
    //let etudiantId = localStorage.getItem("editEtudiantId");
   
    if(!this.id) {
      alert("Invalid action.")
      this.router.navigate(['student']);
      return;
    }
    this.classeService.getAllClasse().subscribe();
    this.updateForm = this.formBuilder.group({
      etudiantId : null,
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      phone : ['', Validators.required],
      classeId : ['', Validators.required],
    
      
    });
    this.studentService.getEtudiantById(this.id)
    .subscribe( data => {
      this.etudiant = data as Etudiant;
      console.log(this.etudiant);
      this.updateForm.setValue(data);
    });
    
  }

  onSubmit() {
    let etudiant = this.updateForm.value
    etudiant.classeId = this.inputSelect;
    this.studentService.updateEtudiant(etudiant)
      .subscribe( data => {
        this.router.navigate(['student']);
      });
  }

  onChange(value){
    this.inputSelect = value.detail.value
}

}
