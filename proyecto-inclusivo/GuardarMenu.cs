using System.Collections.Generic;
using Newtonsoft.Json;
using proyecto_inclusivo.models;
using System.IO;
using System.Linq;

namespace proyecto_inclusivo
{
    public class HandleMenu
    {
        private List<Menu> datos = new List<Menu>();
        private string path = "./Datos/JsonMenu.json";
        public Menu aDevolver = new Menu();
        
        public void GuardarCambios()
        {
            string json = JsonConvert.SerializeObject(datos);
            File.WriteAllText(path, json);
        }
        
        public void Obtener()
        {
            string archivo = File.ReadAllText(path);
            datos = JsonConvert.DeserializeObject<List<Menu>>(archivo);
        }
        
        public void Agregar(int Id)
        {
            Menu newMenu = new Menu();
            newMenu.userId = Id;
            datos.Add(newMenu);
            GuardarCambios();
        }

        public void Actualizar(Menu menu)
        {
            datos.Select(x => {
                if(x.userId == menu.userId) x = menu;
                return x;
            }).ToList();
        }
        public Menu devolverMenu(int userId)
        {
            datos.Select(x => {
                if(x.userId == userId) aDevolver = x;
                return x;
            }).ToList();
            return aDevolver;
        }
    }
}