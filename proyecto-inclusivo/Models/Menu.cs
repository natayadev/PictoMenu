using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace proyecto_inclusivo.models
{
    public class Menu
    {
        public int userId { get; set; }
        private IList<Pagina> _paginas = new List<Pagina>();

        public virtual IList<Pagina> paginas
        {
            get { return _paginas; }
            set { _paginas = value; }
        }
    }
}
