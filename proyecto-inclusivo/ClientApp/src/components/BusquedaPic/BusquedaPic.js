import React, { useState, useEffect } from "react";
import { Pic } from "./Pic";
import LayzyLoad from "react-lazyload";
import "./BusquedaPic.css";
import car from "../Resources/spin3.gif"

const BusquedaPic = (props) => {
  const [parametroBusqueda, setParametroBusqueda] = useState("");
  const [pictograms, setPictograms] = useState([]);
  const [resultadoTexto, setResultadoTexto] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    setParametroBusqueda(e.target.value);
  }

  async function buscar() {
    if (parametroBusqueda.length >= 3) {
      setResultadoTexto("");
      const res = await fetch(
        "https://api.arasaac.org/api/pictograms/es/search/" + parametroBusqueda
      );

      if (res.status !== 200) {
        setResultadoTexto("No se han encontrado resultados");
        // return setPictograms([]);
      } else {
        setResultadoTexto("Toque sobre el pictograma para añadirlo");
        setPictograms(await res.json());
      }
    }
  };

  useEffect(() => {
    const res = buscar();
  }, [parametroBusqueda]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="bg-light text-center busquedaPics">
      <div>
        <button id="CANCELAR" style={{ left: "0px", position: "absolute", fontSize: "1.5rem", fontWeight: "bold" }} onClick={props.seleccionarPic}>X</button>
        <h5 className="txt">Agregar pictograma</h5>
        <form>
          <input
            className="form-control"
            name="busqueda"
            id="input"
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            value={parametroBusqueda}
            type="text"
            placeholder="Buscador de alimentos"
          />
          <small id="ResultadoTexto">{resultadoTexto}</small>
        </form>
      </div>
      <div
        className="Resultados"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "170px",
          overflow: "auto",
        }}
      >
        {pictograms.map((r, index) => (
          <LayzyLoad key={index} height={150} overflow once>
            <Pic
              key={index}
              id={r._id + ""}
              seleccionarPic={props.seleccionarPic}
              ondrag={props.ondrag}
            />
          </LayzyLoad>
        ))}
      </div>
    </div>
  );
};
export default BusquedaPic;
