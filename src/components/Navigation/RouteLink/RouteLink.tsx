import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

type RouteLinkProps = {
  title: string;
  path: string;

  exact?: boolean;
};

function RouteLink({ path, title, exact }: RouteLinkProps) {
  let match = useRouteMatch({
    path,
    exact,
  });

  return (
    <div className={match ? "nav__item--active" : ""}>
      {match && "> "}
      <Link to={path}>{title}</Link>
    </div>
  );
}

export default RouteLink;
