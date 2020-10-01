import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

type NavigationItemProps = {
  title: string;
  path: string;

  exact?: boolean;
};

function NavigationItem({ path, title, exact }: NavigationItemProps) {
  let match = useRouteMatch({
    path,
    exact
  });

  return (
    <li className={match ? "nav__item--active" : ""}>
      {match && "> "}
      <Link to={path}>{title}</Link>
    </li>
  );
}

export default NavigationItem;
