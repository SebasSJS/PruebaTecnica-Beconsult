using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUsuarioRepository _repository;

    public AuthController(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var usuario = await _repository.ObtenerPorUsernameAsync(loginDto.Username);

        // Si no existe el usuario
        if (usuario == null) return Unauthorized("Usuario o contraseña incorrectos.");

        // Verificamos el hash con BCrypt
        bool passwordValida = BCrypt.Net.BCrypt.Verify(loginDto.Password, usuario.Password);

        if (!passwordValida) return Unauthorized("Usuario o contraseña incorrectos.");

        return Ok(new { mensaje = "Login exitoso", username = usuario.Username });
    }
}
