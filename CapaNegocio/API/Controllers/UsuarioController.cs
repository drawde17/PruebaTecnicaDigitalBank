using API.DTO;
using API.Interfaces;
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

        public UsuarioController(ILogger<UsuarioController> logger, IUsuarioServicio usuarioServicio)
        {
            _logger = logger;
            _usuarioServicio = usuarioServicio;
        }

        [HttpPost(Name = "Adicionar")]
        public Response<bool> Adicionar(UsuarioDTO user)
        {
            return _usuarioServicio.Adicionar(user);
        }

        [HttpPut(Name = "Modificar")]
        public Response<bool> Modificar(UsuarioDTO user)
        {
            return _usuarioServicio.Modificar(user);
        }

        [HttpGet(Name = "Consultar")]
        public Response<IEnumerable<UsuarioDTO>> Consultar()
        {
            return _usuarioServicio.Consultar();
        }

        [HttpDelete(Name = "Eliminar")]
        public Response<bool> Eliminar(int id)
        {
            return _usuarioServicio.Eliminar(id);
        }
    }
}
