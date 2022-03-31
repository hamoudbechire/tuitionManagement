import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'professeur',
    pathMatch: 'full'
  },
  {
    path: 'professeur',
    loadChildren: () => import('./pages/professeur/professeur.module').then( m => m.ProfesseurPageModule)
  },
  {
    path: 'add-professeur/:id',
    loadChildren: () => import('./pages/add-professeur/add-professeur.module').then( m => m.AddProfesseurPageModule)
  },
  {
    path: 'matiere',
    loadChildren: () => import('./pages/matiere/matiere.module').then( m => m.MatierePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
