import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSallePage } from './add-salle.page';

const routes: Routes = [
  {
    path: '',
    component: AddSallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSallePageRoutingModule {}
