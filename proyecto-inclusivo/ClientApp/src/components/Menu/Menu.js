import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Logo from "../SubirLogo/SubirLogo";
import Pagina from "../Pagina/Pagina";
import ExportPDF from "./ExportPDF";
import "./menu.css";

const Menu = () => {

  const [infoMenu, setInfoMenu] = useState(
    {
      userId: 28,
      paginas: [
        {
          platos: [
            {
              picPlato: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQVgG094rgjMEC1d5_-ZwEVYr3sc-3IVjMwDnrE6YfeTETegGN&usqp=CAU",
              idIngredientes: [],
              picsIngredientes: []
            },
          ]
        },
      ]
    }
  );

  // useEffect(() => {
  //   fetch('https://localhost:5001/handlemenu')
  //   .then( response => {
  //     if(response.status === 200){
  //       return response.json();
  //     }
  //   })
  //   .then( jsonR => {
  //     console.log(jsonR);
  //   })

  // }, [])
  useEffect(() => {
    console.log("InfoMenuActualizado")
    console.table(infoMenu);
  }, [infoMenu])
  const newPagina = () => {
    setInfoMenu(
      {
        userId: 28,
        paginas: [
          ...infoMenu.paginas,
          {
            platos: [
              {
                picPlato: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQVgG094rgjMEC1d5_-ZwEVYr3sc-3IVjMwDnrE6YfeTETegGN&usqp=CAU",
                idIngredientes: [],
                picsIngredientes: []
              },
            ]
          },
        ]
      }
    );
  }
  const updateInfoPage = (a, b) => {
    const newInfo = infoMenu;
    newInfo.paginas[b] = a;
    setInfoMenu(newInfo)
  }

  const guardarPagina = () => {
    console.log(JSON.stringify(infoMenu));
    Swal.fire({
      title: "<strong>¿Desea guardar los cambios?</strong>",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: "#7d2998",
      confirmButtonText: "Si",
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: "No",
      cancelButtonAriaLabel: "Thumbs down",
    }).then(resultado => {
      if (resultado.value) {
        fetch("https://localhost:5001/handlemenu", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(infoMenu),
        }).then((response) => {
          if (response.status === 200) {
            console.log("Guardado exitoso");
          }
          else {
            console.log("Ha ocurrido un error, no se guardó");
          }
        });
      }
    });
  }

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column" }}>
      <div
        id="menu"
        className="p-2 col-xs-12"
      >

        <div className="row" style={{ display: "flex", flexDirection: "column" }}>
          {infoMenu.paginas.map((pag, index) => {
            return <Pagina updateInfo={updateInfoPage} infoPag={pag} key={index} index={index} id={index + ""} />
          })}
        </div>
      </div>

      <div className="row botones">
        <div className="row mb-1">
          {infoMenu.paginas.length <= 10 ? (
            <button
              data-html2canvas-ignore
              className="NpagBtn col-xs-12"
              onClick={newPagina}
            >
              Nueva Pagina
            </button>
          ) : null}
        </div>
        <button type="button" className="button" onClick={guardarPagina}>
          Guardar
        </button>
        <button type="button" className="button" onClick={function () { ExportPDF(infoMenu.paginas.length) }}>
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};
export default Menu;
