import React, { Component } from "react";
import "../Registro/Registro.css";
import car from "../Resources/Car.gif";
import Swal from "sweetalert2";

export class RestablecerPassword extends Component {
  static displayName = RestablecerPassword.name;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPass: "",
      sec_quest: 0,
      answ: "",
      errPassword: "",
      errConfirmPass: "",
      errInfo: "",
    };
  }

  handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  handleValidation = () => {
    const { email, password, confirmPass } = this.state;
    let errEmail,
      errPassword,
      errConfirmPass = "";
    if (email.length < 6 || !email.includes("@")) {
      errEmail = "El email es incorrecto.";
    }
    if (password.length < 6) {
      errPassword = "La contraseña es demasiado corta.";
    }
    if (!(password === confirmPass)) {
      errConfirmPass = "Las contraseñas no son iguales.";
    }
    if (errEmail || errPassword || errConfirmPass) {
      this.setState({ errEmail, errPassword, errConfirmPass });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      document.getElementById('cargando').style.display = "inline";
      document.getElementById('intentarRestablecer').style.display = "none";
      this.setState({
        errInfo: "",
        errEmail: "",
        errPassword: "",
        errConfirmPass: "",
      });
      fetch("https://localhost:5001/forgotpassword", {
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
      }).then((res) => {
        if (res.status === 200) {
          document.getElementById('cargando').style.display = "none";
          document.getElementById('intentarRestablecer').style.display = "inline";
            Swal.fire({
            title: "<strong>Contraseña restablecida con éxito</strong>",
            icon: "success",
            confirmButtonColor: "#7d2998",
            });
          this.props.history.push("/ingreso");
        } else {
          document.getElementById('cargando').style.display = "none";
          document.getElementById('intentarRestablecer').style.display = "inline";
          this.setState({ errInfo: "Información incorrecta." });
        }
      });
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
            <h1 className="text-center">Reestablecer contraseña</h1>
              <form action="" method="post" name="forgotpassword">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control input text-white"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted">
                    {this.state.errEmail}
                  </small>
                </div>
                <div className="form-group">
                  <select
                    type="sec_quest"
                    className="custom-select2"
                    name="sec_quest"
                    id="sec_quest"
                    onChange={this.handleChange}
                  >
                    <option disabled selected defaultValue>
                      -Seleccionar pregunta-
                    </option>
                    <option value={1}>Nombre de tu primera mascota</option>
                    <option value={2}>Personaje histórico favorito</option>
                    <option value={3}>Lugar de nacimiento de tu madre</option>
                    <option value={4}>Personaje de ficción favorito</option>
                  </select>
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
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control input"
                    id="password"
                    placeholder="Nueva contraseña"
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
                  <small className="form-text text-muted">
                    {this.state.errConfirmPass}
                  </small>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary2 btn-block"
                    onClick={this.handleSubmit}
                  >
                    <img alt="" src={car} id="cargando" style={{display:"none"}}/>
                   <span id="intentarRestablecer">Enviar respuesta</span>
                  </button>
                  <small className="form-text text-muted b-2">
                    {this.state.errInfo}
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
