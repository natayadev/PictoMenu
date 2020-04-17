import React, { Component } from 'react';
import img1 from '../Resources/Ejemplo/img1.png';
import test1 from '../Resources/img_carrousel/test1.gif';
import test2 from '../Resources/img_carrousel/test2.gif';
import test3 from '../Resources/img_carrousel/test3.gif';
import $ from "jquery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './home.css';

export class Home extends Component {
  static displayName = Home.name;
  handleClick = () => this.props.history.push('registro');
  render() {
    return (
      <div className="container-fluid">
        <div className="row presentacion">
          <div className="col-sm-12 col-md-6 order-md-2">
            <div className="card-body grow centro">
              <img src={img1} className="ex" alt="" />
            </div>
          </div>

          <div className="col-sm-12 col-md-6 order-md-1">
            <div className="card-body grow">
              <h2><i><b>Crea tu menú con pictogramas</b></i></h2>
              <h4>Estamos listos para ayudarte a mejorar la experiencia de tu Restaurant.</h4>
              <h4>Convierte tu establecimiento en un espacio accesible y adaptado a las necesidades de tus clientes.</h4><br />
              <h4><b>Gratis y sin publicidad</b>, como las mejores cosas en línea.</h4><br />
              <p>¿No tienes cuenta?<strong onClick={this.handleClick}> ¡Registrate!</strong></p>
            </div>
          </div>
        </div>

        <div className="row">
          <Carousel className="carro" autoPlay infiniteLoop>
            <div>
              <img src={test1} />
              <p className="legend">Creá tus menus personalizados con sus propios ingredientes</p>
            </div>
            <div>
              <img src={test2} />
              <p className="legend">Añadí hasta 6 Plato por páginas</p>
            </div>
            <div>
              <img src={test3} />
              <p className="legend">Agregá cuantas páginas quieras!!</p>
            </div>
          </Carousel>
        </div>

        <div className="row">
          <div className="card-body grow">
            <h3 className="text-center"><b>¡Conocenos un poco más!</b></h3>
            <h4><b>PictoMenu</b> es una aplicación que nació de un grupo de desarrolladores con ganas de hacer foco en la inclusión. Directo desde Misiones a sus pantallas. Hicimos cada linea de código seguros de que juntos podemos hacer más.</h4>
            <h5>Si queres saber más sobre el TEA visita
              <a className="Link" href="http://www.panaacea.org/espectro-autista/" target="_blank"> PANAACEA</a></h5>
          </div>
        </div>
      </div>
    );
  }
}