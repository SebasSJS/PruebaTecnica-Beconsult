import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  listaUsuarios: any[] = [];

  constructor(
    private authService: Auth, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}
  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API:', data); 
        this.listaUsuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}