import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfesseurPageRoutingModule } from './add-professeur-routing.module';

import { AddProfesseurPage } from './add-professeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProfesseurPageRoutingModule
  ],
  declarations: [AddProfesseurPage]
})
export class AddProfesseurPageModule {}
