import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  listaUsuarios: any[] = [];
  
  // Variables para controlar el formulario modal
  mostrarFormulario = false;
  usuarioForm!: FormGroup;
  usuarioEnEdicion: any = null;

  constructor(
    private authService: Auth, 
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    
    // Inicializamos el formulario vacío
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''] 
    });
  }

  cargarUsuarios() {
    this.authService.getUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }

  // --- MÉTODOS DE LA INTERFAZ ---

  abrirFormularioNuevo() {
    this.mostrarFormulario = true;
    this.usuarioEnEdicion = null;
    this.usuarioForm.reset();
    
    // contraseña obligatoria
    this.usuarioForm.get('password')?.setValidators([Validators.required]);
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  abrirFormularioEditar(usuario: any) {
    this.mostrarFormulario = true;
    this.usuarioEnEdicion = usuario;
    
    // Llenamos el formulario con los datos del usuario a editar
    this.usuarioForm.patchValue({
      username: usuario.username,
      email: usuario.email,
      password: '' 
    });
    
    // Al editar, la contraseña NO es obligatoria
    this.usuarioForm.get('password')?.clearValidators();
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.usuarioForm.reset();
  }

  // --- MÉTODOS QUE LLAMAN AL BACKEND ---

  guardarUsuario() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    if (this.usuarioEnEdicion) {
      // ACTUALIZAR (PUT)
      this.authService.actualizarUsuario(this.usuarioEnEdicion.id, this.usuarioForm.value).subscribe({
        next: () => {
          this.cargarUsuarios(); // Recargamos la tabla
          this.cerrarFormulario();
        },
        error: (err) => alert('Error: ' + (err.error?.mensaje || 'No se pudo actualizar'))
      });
    } else {
      // CREAR NUEVO (POST)
      this.authService.crearUsuario(this.usuarioForm.value).subscribe({
        next: () => {
          this.cargarUsuarios(); 
          this.cerrarFormulario();
        },
        error: (err) => alert('Error: ' + (err.error?.mensaje || 'No se pudo crear'))
      });
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.authService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => console.error(err)
      });
    }
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}