import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu/NavMenu";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <Container className="container-fluid">{props.children}</Container>
    </div>
  );
};
export default Layout;
