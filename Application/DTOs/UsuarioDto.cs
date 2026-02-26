using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs;

public class UsuarioDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool Estado { get; set; }
    public DateTime FechaCreacion { get; set; }

    // 🛑 Fíjate que aquí NO ponemos la propiedad Password
}
