import React, { Component } from "react";
import "./Registro.css";
import reg from "../Resources/Registro.png";
import Swal from "sweetalert2";
import car from "../Resources/spin2.gif";

const initState = {
  email: "",
  sec_quest: 0,
  answ: "",
  password: "",
  confirmPass: "",
  errEmail: "",
  errPassword: "",
  errConfirmPass: "",
  errSec_quest: "",
  errAnsw: "",
};

export class Registro extends Component {
  static displayName = Registro.name;

  constructor(props) {
    super(props);
    this.state = initState;
  }

  handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  handleValidation = () => {
    const { email, password, confirmPass, sec_quest, answ } = this.state;
    let errEmail,
      errPassword,
      errConfirmPass,
      errSec_quest,
      errAnsw = "";
    if (email.length < 6 || !email.includes("@")) {
      errEmail = "El email es incorrecto.";
    }
    if (password.length < 6) {
      errPassword = "La contraseña es demasiado corta.";
    }
    if (password != confirmPass) {
      errConfirmPass = "Las contraseñas no son iguales.";
    }
    if (sec_quest === 0) {
      errSec_quest = "Debe elegir una pregunta.";
    }
    if (!answ) {
      errAnsw = "Aún no escribió su respuesta.";
    }
    if (errEmail || errPassword || errConfirmPass || errSec_quest || errAnsw) {
      this.setState({
        errEmail,
        errPassword,
        errConfirmPass,
        errSec_quest,
        errAnsw,
      });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      document.getElementById("cargando").style.display = "inline";
      document.getElementById("crearCuenta").style.display = "none";
      fetch("https://localhost:5001/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          sec_quest: parseInt(this.state.sec_quest),
          answ: this.state.answ.toLowerCase().replace(/ /g, ""),
        }),
      }).then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          document.getElementById("cargando").style.display = "none";
          document.getElementById("crearCuenta").style.display = "inline";
          Swal.fire({
            title: "<strong>Registro exitoso</strong>",
            icon: "success",
            confirmButtonColor: "#7d2998",
          });
          this.props.history.push("/ingreso");
        } else if (response.status === 400) {
          document.getElementById("cargando").style.display = "none";
          document.getElementById("crearCuenta").style.display = "inline";
          Swal.fire({
            title: "<strong>Email en uso, intente con otro</strong>",
            icon: "error",
            confirmButtonColor: "#7d2998",
          });
        }
      });
      this.setState(initState);
    }
  };

  render() {
    return (
      <div
        id="card"
        className="grow shadow-lg p-3 mb-5 bg-white rounded container-fluid"
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="form">
            <h1 className="text-center"><img src={reg} className="reg" alt=""/>Regístrese</h1>
              <form action="" method="post" name="registro">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control input"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted b-2">
                    {this.state.errEmail}
                  </small>
                </div>
                <div className="form-group">
                  <select
                    type="sec_quest"
                    name="sec_quest"
                    className="custom-select"
                    placeholder="Pregunta secreta"
                    onChange={this.handleChange}
                  >
                    <option disabled selected>-Pregunta de seguridad-</option>
                    <option value={1}>Nombre de tu primera mascota</option>
                    <option value={2}>Personaje histórico favorito</option>
                    <option value={3}>Lugar de nacimiento de tu madre</option>
                    <option value={4}>Personaje de ficción favorito</option>
                  </select>
                  <small className="form-text text-muted b-2">
                    {this.state.errSec_quest}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="answ"
                    name="answ"
                    className="form-control input"
                    id="answ"
                    placeholder="Respuesta"
                    value={this.state.answ}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted b-2">
                    {this.state.errAnsw}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control input"
                    id="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted b-2">
                    {this.state.errPassword}
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPass"
                    className="form-control input"
                    id="confirmPass"
                    placeholder="Confirmar contraseña"
                    value={this.state.confirmPass}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted b-2">
                    {this.state.errConfirmPass}
                  </small>
                </div>
                <div className="text-center">
                  <button
                    id="boton"
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmit}
                  >
                    <img
                      id="cargando"
                      src={car}
                      style={{ display: "none" }}
                      id="cargando"
                    />
                    <span id="crearCuenta">Crear cuenta</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
