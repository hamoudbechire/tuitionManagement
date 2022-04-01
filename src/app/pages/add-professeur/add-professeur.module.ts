import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfesseurPageRoutingModule } from './add-professeur-routing.module';

import { AddProfesseurPage } from './add-professeur.page';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    AddProfesseurPageRoutingModule
  ],
  declarations: [AddProfesseurPage]
})
export class AddProfesseurPageModule {}
