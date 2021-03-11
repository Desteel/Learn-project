import React from "react";
import RouteLink from "./RouteLink";
import { NavigationRoutes } from "constants/navigation";

const NavigationItems = [
  {
    path: NavigationRoutes.Main,
    title: "Main",
    exact: true,
  },
  {
    path: NavigationRoutes.Catalog,
    title: "Catalog",
  },
  {
    path: NavigationRoutes.Personal,
    title: "Personal",
  },
];

function Navigation() {
  return (
    <nav>
      <ul>
        {NavigationItems.map(({ path, title, exact }) => (
          <li key={title}>
            <RouteLink title={title} path={path} exact={exact} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
