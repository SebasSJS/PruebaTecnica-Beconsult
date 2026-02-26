import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos el enrutador para poder redirigir al usuario si es necesario
  const router = inject(Router);
  
  // Leemos la llave temporal que guardamos al hacer login
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // Si la llave existe y es true, le abrimos la puerta
  if (isAuthenticated === 'true') {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};