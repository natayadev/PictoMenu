import React, { useState, useContext } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import fav from "../Resources/Picto.png";
import userLoginContext from "../userContext";
import "./NavMenu.css";
import Swal from "sweetalert2";

const NavMenu = () => {
  // Accedindo a hook ofrecido por el contexto
  const { userAuth, setUserAuth } = useContext(userLoginContext);
  const [redirect, setRedirect] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  const cerrarSesion = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "<strong>¿Realmente desea cerrar sesión?</strong>",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "No",
      cancelButtonAriaLabel: "Thumbs down",
      confirmButtonColor: "#7d2998",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.value) {
        setRedirect("/");
        return setUserAuth(false), Cookies.remove("SSID");
      }
    });
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={fav} className="Ico" lt="" />
          </NavbarBrand>
          <NavbarToggler
            onClick={() => setCollapsed((collapsed) => !collapsed)}
            className="mr-2"
          />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              {userAuth == false ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} className="text2" to="/ingreso">
                      Ingresar
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text2" to="/registro">
                      Registro
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} className="text2" to="/creador">
                      Creador
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={redirect}
                      onClick={cerrarSesion}
                      className="text2"
                    >
                      Cerrar sesión
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default NavMenu;
