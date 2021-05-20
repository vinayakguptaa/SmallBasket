import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function Routes() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      )}
    </>
  );
}

export default Routes;
