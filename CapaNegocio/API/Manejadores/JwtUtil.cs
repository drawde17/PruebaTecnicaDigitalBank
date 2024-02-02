using API.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Manejadores
{
    public class JwtUtil
    {
        private readonly MyConfig _config;
        public JwtUtil(MyConfig config)
        {
            _config = config;
        }

        /// <summary>
        /// Metodo encargado de generar autenticacion JWT
        /// </summary>
        /// <returns>Respuesta de servicio</returns>
        public Response<string> GenerateJSONWebToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Jwt.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                _config.Jwt.Issuer,
                _config.Jwt.Issuer,
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );

            return new Response<string>()
            {
                Status = true,
                Message = "OK",
                Data = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
    }
}
