import React from "react";
import NavigationItem from "./NavigationItem";
import { NavigationRoutes } from "constants/navigation";

function Navigation() {
  return (
    <nav>
      <ul>
        <NavigationItem exact path={NavigationRoutes.Main} title="Main" />
        <NavigationItem path={NavigationRoutes.Catalog} title="Catalog" />
        <NavigationItem path={NavigationRoutes.Personal} title="Personal" />
      </ul>
    </nav>
  );
}

export default Navigation;
