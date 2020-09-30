import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

type NavigationItemProps = {
  path: string;
  title: string;
};

function NavigationItem({ path, title }: NavigationItemProps) {
  let match = useRouteMatch({
    path,
    exact: true
  });

  return (
    <li className={match ? "nav__item--active" : ""}>
      {match && "> "}
      <Link to={path}>{title}</Link>
    </li>
  );
}

export default NavigationItem;
