using System.ComponentModel.DataAnnotations;

namespace proyecto_inclusivo.models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public int Sec_quest { get; set; }
        [Required]
        public string Answ { get; set; }
    }
}
