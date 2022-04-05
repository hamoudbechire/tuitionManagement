import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassePage } from './classe.page';

const routes: Routes = [
  {
    path: '',
    component: ClassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassePageRoutingModule {}
