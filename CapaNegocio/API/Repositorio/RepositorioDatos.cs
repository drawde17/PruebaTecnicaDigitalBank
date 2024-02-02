using API.DTO;
using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace API.Repositorio
{
    public class RepositorioDatos
    {
        /// <summary>
        /// Metodo encargado de generar la conexion a la base de datos
        /// </summary>
        /// <returns>Conexion a base de datos</returns>
        private IDbConnection CrearConexion()
        {
            return new SqlConnection("Data Source=DRAWDEPC\\SQLEXPRESS;Initial Catalog=PruebaTecnicaDigitalBank;Integrated Security=True;");
        }

        /// <summary>
        /// Metodo que realiza la ejecuacion de procediminetos almacenados mediante el uso de DAPPER
        /// </summary>
        /// <typeparam name="T">Entidad</typeparam>
        /// <param name="sql">Nombre procedimiento</param>
        /// <param name="parameters">parametros esperados por el procedimiento almacenado</param>
        /// <returns>Respuesta de entidad</returns>
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
