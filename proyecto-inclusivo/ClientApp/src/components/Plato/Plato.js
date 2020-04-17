import React, { useState, useEffect } from "react";
import BusquedaPic from "../BusquedaPic/BusquedaPic";
import Ingrediente from "../Ingredientes/Ingredientes.js";
import "./Plato.css";
import Bing from "../Resources/btns/btnIng.png";

const Plato = (props) => {
  const [imagenPlato, setImagenPlato] = useState(props.infoPlato.picPlato);
  const [imagenesIng, setImagenesIng] = useState(props.infoPlato.picsIngredientes);

  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [agregarPicIng, setAgregarPicIng] = useState(false);
  const [ingredienteList, setIngredienteList] = useState(props.infoPlato.idIngredientes);
  const [Contador, setContador] = useState(0);

  useEffect(() => {
    props.updateInfo({
      picPlato: imagenPlato,
      idIngredientes: ingredienteList,
      picsIngredientes: imagenesIng,
    }, props.index);
  }, [imagenPlato])

  useEffect(() => {
    props.updateInfo({
      picPlato: imagenPlato,
      idIngredientes: ingredienteList,
      picsIngredientes: imagenesIng,
    }, props.index);
  }, [ingredienteList])

  const newIngrediente = (e) => {
    e.preventDefault();
    setAgregarPicIng(true);
    setMostrarBusqueda(true);

    setContador(Contador + 1);
    setImagenesIng([...imagenesIng, ""]);
    setIngredienteList([...ingredienteList, Contador]);
  };

  function removerIngrediente(idIngrediente) {
    var newImagenesIng = [];
    const newList = ingredienteList.filter((e, index) => {
      if (e != idIngrediente) {
        newImagenesIng = [...newImagenesIng, imagenesIng[index]];
        return true;
      } else {
        return false;
      }
    });
    setImagenesIng(newImagenesIng);
    setIngredienteList(newList);
  }
  function updateImagenesIng() {
    props.updateInfo({
      picPlato: imagenPlato,
      idIngredientes: ingredienteList,
      picsIngredientes: imagenesIng,
    }, props.index);
  }
  function ExpandirBusqueda(e) {
    e.preventDefault();
    setAgregarPicIng(false);
    setMostrarBusqueda(true);
  }

  function seleccionarPic(e) {
    e.preventDefault();
    if (!agregarPicIng) {
      if (e.target.id != "CANCELAR") {
        setImagenPlato("https://api.arasaac.org/api/pictograms/" + e.target.id);
      }
    }
    else {

      if (e.target.id != "CANCELAR") {
        let newImagenesIng = imagenesIng;
        newImagenesIng[ingredienteList.length - 1] =
          "https://api.arasaac.org/api/pictograms/" + e.target.id;
        setImagenesIng(newImagenesIng);
        updateImagenesIng();
      }
      else if (e.target.id === "CANCELAR") {
        let newImagenesIng = imagenesIng;
        newImagenesIng[ingredienteList.length - 1] = "";
        setImagenesIng(newImagenesIng);
        const newIngredienteList = ingredienteList;
        newIngredienteList.pop(ingredienteList.length - 1)
        setIngredienteList(newIngredienteList);
        updateImagenesIng();
      }
    }

    setMostrarBusqueda(false);
  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-xs-12 d-flex flex-column align-items-center justify-content-center">
          <div>
            {mostrarBusqueda ? <BusquedaPic setMostrarBusqueda={setMostrarBusqueda} seleccionarPic={seleccionarPic} /> : null}
          </div>
          <div>
            <img
              onClick={ExpandirBusqueda}
              className="btn m-0 p-0"
              src={imagenPlato}
              style={{ borderRadius: "12px" }}
              alt="Añada su plato"
              width="156"
              height="156"
            />
          </div>
        </div>

        <div className="col-xs-6 precios">
          <textarea
            className="bg-transparent platoPrincipal"
            placeholder="Plato principal"
          />
          <div className="input-group">
            <p style={{ margin: "auto" }}>Precio:  <span>$</span>
            </p>
            <input
              type="number"
              className="inputPrecio"
              placeholder="0.00"
            />
          </div>

        </div>
      </div>
      <div className="row">
        <div id="seccionIngredientes" className="mt-2">
          {ingredienteList.map((e, index) => {
            return (
              <Ingrediente
                key={e}
                id={e + ""}
                src={imagenesIng[index]}
                onclick={removerIngrediente}
              />
            );
          })}

          {ingredienteList.length < 6 ? (
            <button
              id="newIngredienteButton"
              data-html2canvas-ignore="true"
              onClick={newIngrediente}
            >
              <img src={Bing} className="bimg2" alt="" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Plato;
