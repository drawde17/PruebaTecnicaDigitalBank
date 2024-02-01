using API.DTO;
using API.Interfaces;
using API.Repositorio;
using Newtonsoft;
using Newtonsoft.Json;

namespace API.Servicio
{
    public class UsuarioServicio : RepositorioDatos, IUsuarioServicio
    {
        public Response<bool> Adicionar(UsuarioDTO user)
        {
            try
            {
                var adicionarDato = Query<ResultadoQuery>("AdicionarUsuario", user);

                if(!ResultadoQuery.Validar(adicionarDato))
                    return new Response<bool>()
                    {
                        Status = false,
                        Message = "No se puedo adicionar el usuario, intente nuevamente"
                    };

                return new Response<bool>()
                {
                    Status = true,
                    Message = "OK",
                    Data = true
                };
            }
            catch (Exception ex)
            {
                Query<ResultadoQuery>("AdicionarLog", new { Tipo = "ERROR", Metodo = "UsuarioServicio->Adicionar", Valor = JsonConvert.SerializeObject(new { Exception = ex.Message }) });
                return new Response<bool>()
                {
                    Status = true,
                    Message = "Ha ocurrido un error, intente nuevamente"
                };
            }
        }

        public Response<bool> Modificar(UsuarioDTO user)
        {
            try
            {
                var modificarDato = Query<ResultadoQuery>("ModificarUsuario", user);

                if (!ResultadoQuery.Validar(modificarDato))
                    return new Response<bool>()
                    {
                        Status = false,
                        Message = "No se puedo modificar el usuario, intente nuevamente"
                    };

                return new Response<bool>()
                {
                    Status = true,
                    Message = "OK",
                    Data = true
                };
            }
            catch (Exception)
            {
                return new Response<bool>()
                {
                    Status = true,
                    Message = "Ha ocurrido un error, intente nuevamente"
                };
            }
        }

        public Response<IEnumerable<UsuarioDTO>> Consultar()
        {
            try
            {
                var consulta = Query<UsuarioDTO>("ConsultarUsuario");
                return new Response<IEnumerable<UsuarioDTO>>()
                {
                    Status = true,
                    Message = "OK",
                    Data = consulta
                };
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<UsuarioDTO>>()
                {
                    Status = true,
                    Message = "Ha ocurrido un error, intente nuevamente"
                };
            }
        }

        public Response<bool> Eliminar(int id)
        {
            try
            {
                var eliminarDato = Query<ResultadoQuery>("EliminarUsuario", new { IdUsuario = id});

                if (!ResultadoQuery.Validar(eliminarDato))
                    return new Response<bool>()
                    {
                        Status = false,
                        Message = "No se puedo eliminar el usuario, intente nuevamente"
                    };

                return new Response<bool>()
                {
                    Status = true,
                    Message = "OK",
                    Data = true
                };
            }
            catch (Exception)
            {
                return new Response<bool>()
                {
                    Status = true,
                    Message = "Ha ocurrido un error, intente nuevamente"
                };
            }
        }
    }
}
