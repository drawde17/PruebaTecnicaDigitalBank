
namespace API.DTO
{
    public class MyConfig
    {
        public Jwt Jwt { get; set; }
    }
    public class Jwt
    {
        public string Key { get; set; }
        public string Issuer { get; set; }

    }
}
