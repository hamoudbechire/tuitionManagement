import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSallePageRoutingModule } from './add-salle-routing.module';

import { AddSallePage } from './add-salle.page';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    AddSallePageRoutingModule
  ],
  declarations: [AddSallePage]
})
export class AddSallePageModule {}
