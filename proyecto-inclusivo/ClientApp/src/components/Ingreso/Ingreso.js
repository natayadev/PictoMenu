import React, { useState, useContext } from "react";
import { useInputChange } from "../useInputChange";
import userLoginContext from "../userContext";
import "../Registro/Registro.css";
import car from "../Resources/spin2.gif";

const Ingreso = (props) => {
  const [input, handleInputChange] = useInputChange();

  const { email, password } = input;
  const [invalid, setInvalid] = useState("");
  const [secretQuestion, setSecretQuestion] = useState(0);
  const [answ, setAnsw] = useState("none");

  const { userAuth, setUserAuth } = useContext(userLoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalid("");
    document.getElementById("cargando").style.display = "inline";
    document.getElementById("ingreso").style.display = "none";
    fetch("https://localhost:5001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ email, password, secretQuestion, answ }),
    }).then((res) => {
      if (res.status === 200) {
        document.getElementById("cargando").style.display = "none";
        document.getElementById("ingreso").style.display = "inline";
        setUserAuth(true);
        props.history.push("/creador");
      } else {
        document.getElementById("cargando").style.display = "none";
        document.getElementById("ingreso").style.display = "inline";
        setInvalid("Datos de ingreso incorrectos.");
      }
    });
  };

  const invalidRedir = () => {
    props.history.push("/forgotpassword");
  };

  return (
    <div
      id="card"
      className="grow shadow-lg p-3 mb-5 bg-white rounded container-fluid"
    >
      <div className="row">
        <div className="col-sm-12">
          <div className="form">
          <h1 className="text-center">Ingresar</h1>
            <form action="" method="post" name="registro">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control input text-white"
                  id="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control input text-white"
                  id="password"
                  placeholder="Contraseña"
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  <img
                    alt=""
                    id="cargando"
                    style={{ display: "none" }}
                    src={car}
                  />
                  <span id="ingreso">Ingresar</span>
                </button>
                <small className="form-text text-muted b-2">{invalid}</small>
                <button
                  style={{
                    fontSize: "0.8em",
                    textShadow: "2px 2px 2px rgb(50,50,50)",
                  }}
                  className="bg-transparent border-0 text-light"
                  onClick={invalidRedir}
                  >
                  He olvidado mi contraseña.
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ingreso;
