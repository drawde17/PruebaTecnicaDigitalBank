using API.DTO;

namespace API.Interfaces
{
    public interface IUsuarioServicio
    {
        Response<bool> Adicionar(UsuarioDTO user);
        Response<bool> Modificar(UsuarioDTO user);
        Response<IEnumerable<UsuarioDTO>> Consultar();
        Response<bool> Eliminar(int id);
    }
}
