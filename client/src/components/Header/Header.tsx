import React from "react";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "constants/navigation";
import { StyledHeader } from "./Header.styles";

function Header() {
  return (
    <StyledHeader>
      <div>Store</div>
      <div>
        <Link to={NavigationRoutes.Account}>Log In</Link>
      </div>
    </StyledHeader>
  );
}

export default Header;
