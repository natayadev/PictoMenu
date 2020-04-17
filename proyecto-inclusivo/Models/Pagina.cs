using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace proyecto_inclusivo.models
{
    public class Pagina
    {
        private IList<Plato> _platos = new List<Plato>();

        public virtual IList<Plato> platos
        {
            get { return _platos; }
            set { _platos = value; }
        }
    }
}
