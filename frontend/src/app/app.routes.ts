import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Usuarios } from './components/usuarios/usuarios';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'usuarios', component: Usuarios },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige la raíz al login
  { path: '**', redirectTo: '/login' } // Cualquier ruta desconocida va al login
];