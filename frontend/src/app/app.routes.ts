import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Usuarios } from './components/usuarios/usuarios';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: Login },
  { 
    path: 'usuarios', 
    component: Usuarios,
    canActivate: [authGuard] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];