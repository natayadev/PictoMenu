import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import Layout from "./components/Layout";
import { Home } from "./components/Home/Home";
import { Registro } from "./components/Registro/Registro";
import Ingreso from "./components/Ingreso/Ingreso";
import Menu from "./components/Menu/Menu";
import Cookie from "js-cookie";
import userLoginContext from "./components/userContext";
import { RestablecerPassword } from "./components/RestablecerPassword/RestablecerPassword";
import "./custom.css";

const App = () => {
  const [userAuth, setUserAuth] = useState(
    Cookie.get("SSID") != null ? true : false
  );

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      component={(props) =>
        userAuth === true ? (
          <Component {...props} />
        ) : (
            <Redirect to="/ingreso" />
          )
      }
    />
  );

  return (
    <userLoginContext.Provider value={{ userAuth, setUserAuth }}>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={Registro} />
        <Route path="/ingreso" component={Ingreso} />
        <Route path="/forgotpassword" component={RestablecerPassword} />
        <PrivateRoute path="/creador" component={Menu} />
      </Layout>
    </userLoginContext.Provider>
  );
};

export default App;