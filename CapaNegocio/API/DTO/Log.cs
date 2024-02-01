namespace API.DTO
{
    public class Log
    {
        public long IdLog { get; set; }
        public string Tipo { get; set; }
        public string Metodo { get; set; }
        public string Valor { get; set; }
        public DateTime Fecha { get; set; }
    }
}
