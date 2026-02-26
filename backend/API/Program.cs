using Application.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


// Servicios al contenedor
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Inyección del dbcontext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Repository
builder.Services.AddScoped<IUsuarioRepository, Infrastructure.Repositories.UsuarioRepository>();
//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// activación de cors
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
