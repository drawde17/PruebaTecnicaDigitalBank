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
    public class AutenticacionController : ControllerBase
    {
        private readonly ILogger<AutenticacionController> _logger;
        private readonly MyConfig _config;
        public AutenticacionController(ILogger<AutenticacionController> logger, IOptions<MyConfig> options)
        {
            _logger = logger;
            _config = options.Value;
        }

        [AllowAnonymous]
        [HttpPost(Name = "ObtenerToken")]
        public Response<string> ObtenerToken()
        {
            var jwt = new JwtUtil(_config);
            return jwt.GenerateJSONWebToken();
        }
    }
}
