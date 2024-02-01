namespace API.DTO
{
    public class ResultadoQuery
    {
        public int Estado { get; set; }

        public static bool Validar(List<ResultadoQuery> datos) 
        {
            if (datos == null)
                return false;

            var estadoAdicion = datos.FirstOrDefault()?.Estado;

            if (estadoAdicion == null || estadoAdicion != 0)
                return false;

            return true;
        }
    }
}
