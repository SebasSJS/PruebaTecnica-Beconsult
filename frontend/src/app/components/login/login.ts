import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit { 
  loginForm!: FormGroup; // formulario reactivo
  errorMessage = '';

  // Inyectamos el FormBuilder con tus otros servicios
  constructor(
    private fb: FormBuilder, 
    private authService: Auth, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    // Si el formulario es inválido (campos vacíos), detenemos la ejecución
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('¡Éxito!', response);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}