import React, { useState } from "react";
import "./Ingredientes.css";

const Ingrediente = (props) => {
  const [idIngrediente, setidIngrediente] = useState(props.id);

  return (
    <div className="ingrediente">
      <div width="60" height="60">
        <img
          className="btn m-0 p-0"
          style={{ borderRadius: "6px" }}
          src={props.src}
          alt=""
          width="60"
          height="60"
          onClick={() => props.onclick(idIngrediente)}
        />
      </div>
      <textarea
        id="nombreIngrediente"
        type=""
        className="border-0 bg-transparent m-0 p-0"
        placeholder="Ingrediente"
        style={{ resize: "none", border: "none" }}
      />
    </div>
  );
};

export default Ingrediente;
