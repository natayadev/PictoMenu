using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace proyecto_inclusivo.models
{
    public class Plato
    {
        public string picPlato { get; set; }
        private IList<int> _idIngredientes = new List<int>();

        public virtual IList<int> idIngredientes
        {
            get { return _idIngredientes; }
            set { _idIngredientes = value; }
        }
        private IList<string> _picsIngredientes = new List<string>();

        public virtual IList<string> picsIngredientes
        {
            get { return _picsIngredientes; }
            set { _picsIngredientes = value; }
        }
    }
}
