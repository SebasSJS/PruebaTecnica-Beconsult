# Proyecto de Mantenimiento de Usuarios - Prueba Técnica

Este repositorio contiene una solución Full Stack desarrollada para la gestión y mantenimiento de usuarios. La aplicación implementa funcionalidades de autenticación, seguridad de rutas y operaciones CRUD, siguiendo estándares de arquitectura limpia.

## Información del desarrollador
* **Nombre:** Sebastian Josue Suarez lliuya

## Arquitectura y Tecnologías

### Backend (.NET 10)
* **Estructura:** Arquitectura en capas (API, Application, Domain, Infrastructure).
* **Persistencia:** SQL Server 2026 con Entity Framework Core.
* **Seguridad:** Hashing de contraseñas mediante BCrypt y uso de DTOs para la transferencia de datos.

### Frontend (Angular 21)
* **Componentes:** Arquitectura basada en Standalone Components.
* **Formularios:** Implementación de Formularios Reactivos con validaciones de estado.
* **Protección:** Uso de Functional Guards (`CanActivateFn`) para asegurar las rutas privadas.

## Instrucciones de configuración y despliegue

### 1. Base de Datos
* Localice el archivo `script_base_datos.sql` en el directorio raíz.
* Ejecute el script en su instancia local de SQL Server para generar la estructura de tablas necesaria.

### 2. Backend
* Diríjase al directorio `backend/` y abra la solución `PruebaTecnica-Beconsult.slnx` en Visual Studio.
* Verifique la cadena de conexión en el archivo `appsettings.json` del proyecto **API** para asegurar la vinculación con su servidor local.
* Inicie el proyecto mediante el depurador (F5). La API estará disponible en `http://localhost:5203`.

### 3. Frontend
* Acceda al directorio `frontend/` mediante una terminal.
* Ejecute el comando `npm install` para la instalación de dependencias.
* Inicie el servidor de desarrollo con el comando `ng serve`.
* Acceda a la aplicación mediante la dirección `http://localhost:4200`.

## Credenciales de acceso para pruebas
Para la validación inicial de la plataforma, se ha configurado el siguiente usuario administrativo:
* **Username:** `sebastian_admin`
* **Password:** `Password123!`

## Funcionalidades implementadas
* **Operaciones CRUD:** Gestión completa de usuarios (Lectura, Creación, Actualización y Eliminación).
* **Borrado Lógico:** Implementación de baja lógica mediante el campo `Estado` para preservar la integridad referencial.
* **Gestión de Sesión:** Sistema de autenticación con persistencia de estado y restricción de acceso a rutas no autorizadas.