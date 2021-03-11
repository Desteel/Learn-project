import React from "react";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "constants/navigation";

function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={NavigationRoutes.Main}>Return to main page</Link>
    </main>
  );
}

export default NotFound;
