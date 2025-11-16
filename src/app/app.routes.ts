import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetalhesPage } from './pages/detalhes/detalhes.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'detalhes/:id',
    component: DetalhesPage
  },
  {
    path: '**',
    redirectTo: '/home'
  }

];
