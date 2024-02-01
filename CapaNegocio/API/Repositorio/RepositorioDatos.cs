using API.DTO;
using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace API.Repositorio
{
    public class RepositorioDatos
    {
        private IDbConnection CrearConexion()
        {
            return new SqlConnection("Data Source=DRAWDEPC\\SQLEXPRESS;Initial Catalog=PruebaTecnicaDigitalBank;Integrated Security=True;");
        }

        protected List<T> Query<T>(string sql, object parameters = null) 
        {
            using (var conexion = CrearConexion()) 
            { 
                var resultado = conexion.Query<T>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();

                conexion.Query<ResultadoQuery>("AdicionarLog", new { Tipo = "INFORMACION", Metodo = sql, Valor = parameters != "" ? JsonConvert.SerializeObject(parameters) : null });

                return resultado;
            }
        }
    }
}
