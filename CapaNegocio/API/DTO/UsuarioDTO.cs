using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public DateTime FechaNacimiento { get; set; }
        [Required]
        [MaxLength(1)]
        public string Sexo { get; set; }
    }
}
