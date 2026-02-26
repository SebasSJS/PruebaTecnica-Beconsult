import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Capturamos los datos
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('¡Éxito!', response);
        // Si es correcto, navegamos al listado
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}