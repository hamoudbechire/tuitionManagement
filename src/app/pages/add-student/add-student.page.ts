import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { StudentService } from 'src/app/services/student.service';
import { ClasseService } from 'src/app/services/classe.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
  constructor(private formBuilder: FormBuilder,private router: Router, private studentService: StudentService, private classeService : ClasseService) { }

  addForm: FormGroup;
  
  inputSelect;

  ngOnInit() {
    this.classeService.getAllClasse().subscribe();
    this.addForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone : ['', Validators.required],
    });

  }
 

  onSubmit() {
    let etudiant = this.addForm.value
    etudiant.classeId = this.inputSelect;
    this.studentService.createEtudiant(etudiant)
      .subscribe( data => {
        this.router.navigate(['etudiant']);
      });
  }

  onChange(value){
    this.inputSelect = value.detail.value
  
}
}
