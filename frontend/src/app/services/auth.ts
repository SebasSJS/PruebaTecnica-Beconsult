import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Url API C#
  private apiUrl = 'http://localhost:5203/api/auth'; 

  constructor(private http: HttpClient) { }

  // Enviamos credenciales al back
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Listar
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5203/api/users'); 
  }
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post('http://localhost:5203/api/users', usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`http://localhost:5203/api/users/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5203/api/users/${id}`);
  }
}
