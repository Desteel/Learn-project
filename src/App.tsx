import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";
import { Main, Personal, Catalog, NotFound, Account } from "screens";
import { Header, Navigation } from "components";
import { NavigationRoutes } from "constants/navigation";

function App() {
  return (
    <>
      <Normalize />

      <BrowserRouter>
        <Header />
        <Navigation />

        <Switch>
          <Route exact path={NavigationRoutes.Account}>
            <Account />
          </Route>
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
    </>
  );
}

export default App;
