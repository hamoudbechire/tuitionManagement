import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassePageRoutingModule } from './classe-routing.module';

import { ClassePage } from './classe.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ClassePageRoutingModule
  ],
  declarations: [ClassePage]
})
export class ClassePageModule {}
