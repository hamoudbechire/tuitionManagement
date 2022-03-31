import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfesseurPage } from './add-professeur.page';

const routes: Routes = [
  {
    path: '',
    component: AddProfesseurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProfesseurPageRoutingModule {}
