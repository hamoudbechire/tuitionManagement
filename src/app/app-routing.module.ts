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
  path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'matiere',
    loadChildren: () => import('./pages/matiere/matiere.module').then( m => m.MatierePageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'add-student',
    loadChildren: () => import('./pages/add-student/add-student.module').then( m => m.AddStudentPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
