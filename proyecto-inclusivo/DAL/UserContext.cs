using Microsoft.EntityFrameworkCore;
using proyecto_inclusivo.models;

namespace proyecto_inclusivo
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}