import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Main, Personal, Catalog, NotFound } from "screens";
import { Navigation } from "components";
import { NavigationRoutes } from "constants/navigation";

function App() {
  return (
    <BrowserRouter>
      <header></header>
      <Navigation />

      <Switch>
        <Route exact path={NavigationRoutes.Personal}>
          <Personal />
        </Route>
        <Route exact path={NavigationRoutes.Catalog}>
          <Catalog />
        </Route>
        <Route exact path={NavigationRoutes.Main}>
          <Main />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
