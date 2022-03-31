import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatierePageRoutingModule } from './matiere-routing.module';

import { MatierePage } from './matiere.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatierePageRoutingModule
  ],
  declarations: [MatierePage]
})
export class MatierePageModule {}
