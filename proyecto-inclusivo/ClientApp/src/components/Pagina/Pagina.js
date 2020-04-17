import React, { useState, useEffect } from "react";
import Plato from "../Plato/Plato";
import Logo from "../SubirLogo/SubirLogo"
import Bpl from "../Resources/btns/NuevoPlato.png";
import "./pagina.css";

const Pagina = (props) => {
    const [infoPagina, setInfoPagina] = useState(props.infoPag);
    useEffect(() => {
        props.updateInfo(infoPagina, props.index);
    }, [infoPagina]);

    const newPlato = () => {
        setInfoPagina(
            {
                platos: [
                    ...infoPagina.platos,
                    {
                        picPlato: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQVgG094rgjMEC1d5_-ZwEVYr3sc-3IVjMwDnrE6YfeTETegGN&usqp=CAU",
                        idIngredientes: [],
                        picsIngredientes: ["", "", "", "", "", ""],
                    },
                ]
            }
        );
    }
    const updateInfoPlato = (a, b) => {
        const newInfo = infoPagina;
        newInfo.platos[b] = a
        setInfoPagina(newInfo)
    }
    return (
        <React.Fragment>
            <div id={"Pagina " + props.id} className="pagina" style={{ display: "flex", flexDirection: "column" }}>
                <div className="row Logo">
                    <Logo></Logo>
                </div>
                <div className="row">
                    <input
                        className="secciones text-center"
                        placeholder="Nombre de sección (click para editar)"
                    />
                </div>
                <div className="row mt-3" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    {infoPagina.platos.map((plato, index) => {
                        return <Plato updateInfo={updateInfoPlato} id={index + ""} index={index} infoPlato={plato} key={index + 1} />
                    })}
                </div>
                <div className="row arasaacCopyR">
                    <p style={{ margin: "auto" }}>
                        Autor pictogramas: Sergio Palao. Origen: ARASAAC
                        (http://www.arasaac.org). Licencia: CC (BY-NC-SA). Propiedad: Gobierno
                        de Aragon (España)
                    </p>
                </div>

                <div className="row">
                    {infoPagina.platos.length < 2 ? (
                        <button
                            id="newPlatoButton"
                            data-html2canvas-ignore="true"
                            onClick={newPlato}
                            className="mb-1"
                            style={{ margin: "auto" }}
                        >
                            <img src={Bpl} className="bimg" alt="No se pudo cargar imagen" />
                        </button>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Pagina;
