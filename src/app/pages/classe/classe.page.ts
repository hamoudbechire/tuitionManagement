import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classe } from 'src/app/Models/Classe';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.page.html',
  styleUrls: ['./classe.page.scss'],
})
export class ClassePage implements OnInit {
  classes : Classe []
  addForm
  matiereName = '';

  constructor(private classeService : ClasseService, private formBuilder : FormBuilder, private router : Router) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      classeId: null,
      name: ['', Validators.required],
     
    });
    this.classeService.getAllClasse()
      .subscribe( data => {
        this.classes = data;
      });
  }

  deleteClasse(classe: Classe): void {
    this.classeService.deleteClasse(classe.classeId)
      .subscribe( data => {
        this.classes = this.classes.filter(u => u !== classe);
      })
  };

  onSubmit() {
    let classe = this.addForm.value
    
    this.classeService.createClasse(classe)
      .subscribe( data => {
        this.router.navigate(['classe']);
      });
  }

  

  

}

