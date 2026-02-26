using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using BCrypt.Net;

namespace API.Controllers;
[ApiController]
[Route("api/users")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioRepository _repository;

    public UsuariosController(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var usuarios = await _repository.ObtenerTodosAsync();
        // Mapeamos a DTO para no devolver las contraseñas hasheadas en la lista
        var dtos = usuarios.Select(u => new UsuarioDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            Estado = u.Estado,
            FechaCreacion = u.FechaCreacion
        });
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CrearUsuarioDto dto)
    {
        var existe = await _repository.ObtenerPorUsernameAsync(dto.Username);
        if (existe != null) return BadRequest("El nombre de usuario ya está en uso.");

        var nuevoUsuario = new Usuario
        {
            Username = dto.Username,
            Email = dto.Email,
            // Hasheamos la contraseña antes de guardarla
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        await _repository.CrearAsync(nuevoUsuario);
        return Ok(new { mensaje = "Usuario creado exitosamente" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var u = await _repository.ObtenerPorIdAsync(id);
        if (u == null) return NotFound(new { mensaje = "Usuario no encontrado" });

        // Mapeamos DTO
        var dto = new UsuarioDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            Estado = u.Estado,
            FechaCreacion = u.FechaCreacion
        };

        return Ok(dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] CrearUsuarioDto dto) // Reutilizamos tu DTO
    {
        var usuario = await _repository.ObtenerPorIdAsync(id);
        if (usuario == null) return NotFound(new { mensaje = "Usuario no encontrado" });

        // Validar si el nuevo username ya lo tiene otra persona
        var existe = await _repository.ObtenerPorUsernameAsync(dto.Username);
        if (existe != null && existe.Id != id)
            return BadRequest(new { mensaje = "El nombre de usuario ya está en uso." });

        // Actualizamos datos
        usuario.Username = dto.Username;
        usuario.Email = dto.Email;

        // Si el usuario escribe una nueva contraseña, la hasheamos. Si lo deja vacío, conserva la anterior.
        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            usuario.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _repository.ActualizarAsync(usuario);
        return Ok(new { mensaje = "Usuario actualizado exitosamente" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.EliminarAsync(id);
        return Ok(new { mensaje = "Usuario eliminado (Borrado lógico)" });
    }
}
