using API.DTO;
using API.Interfaces;
using API.Manejadores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]/[action]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ILogger<UsuarioController> _logger;
        private readonly IUsuarioServicio _usuarioServicio;
        private readonly MyConfig _config;

        public UsuarioController(ILogger<UsuarioController> logger, IUsuarioServicio usuarioServicio, IOptions<MyConfig> options)
        {
            _logger = logger;
            _usuarioServicio = usuarioServicio;
            _config = options.Value;
        }

        /// <summary>
        /// Sericio para adicionar un usuario
        /// </summary>
        /// <param name="user">Usuario</param>
        /// <returns>Respuesta de servicio</returns>
        [HttpPost(Name = "Adicionar")]
        public Response<bool> Adicionar(UsuarioDTO user)
        {
            return _usuarioServicio.Adicionar(user);
        }

        /// <summary>
        /// Sericio para modificar un usuario
        /// </summary>
        /// <param name="user">Usuario</param>
        /// <returns>Respuesta de servicio</returns>
        [HttpPut(Name = "Modificar")]
        public Response<bool> Modificar(UsuarioDTO user)
        {
            return _usuarioServicio.Modificar(user);
        }

        /// <summary>
        /// Sericio para Consultar usuarios
        /// </summary>
        /// <returns>Respuesta de servicio</returns>
        [HttpGet(Name = "Consultar")]
        public Response<IEnumerable<UsuarioDTO>> Consultar()
        {
            return _usuarioServicio.Consultar();
        }

        /// <summary>
        /// Sericio para eliminar un usuario
        /// </summary>
        /// <param name="id">Identificador de usuario</param>
        /// <returns>Respuesta de servicio</returns>
        [HttpDelete(Name = "Eliminar")]
        public Response<bool> Eliminar(int id)
        {
            return _usuarioServicio.Eliminar(id);
        }
    }
}
