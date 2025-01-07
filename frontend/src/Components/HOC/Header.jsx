import { NavLink, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { pathname } = useLocation();

  return (
    <>
      <header className={pathname === "/" ? "hidden" : "navigation_header"}>
        <nav>
          <NavLink to="/statistiques">            
            <div className="nav-icon">
              <FontAwesomeIcon icon={faChartPie} />
            </div>
            <p className="nav-text">Stats</p>
          </NavLink>
          <Link to="/">
            <img src="CovITLogo.png" alt="Logo CovIT" />
          </Link>
          <NavLink to="/ajouter_des_donnees">
            <div className="nav-icon">
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
            <p className="nav-text">Add data</p>
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header;