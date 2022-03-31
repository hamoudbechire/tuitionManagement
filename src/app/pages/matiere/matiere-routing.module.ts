import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Professeur } from 'src/app/Models/Professeur';

import { MatierePage } from './matiere.page';


const routes: Routes = [
  {
    path: '',
    component: MatierePage
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatierePageRoutingModule {}
