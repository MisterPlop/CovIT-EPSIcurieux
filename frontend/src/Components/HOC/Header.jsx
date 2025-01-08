import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCirclePlus,
  faChalkboardUser,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { pathname } = useLocation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const handleMenu = () => {
    setIsHeaderOpen((prevIsHeaderOpen) => !prevIsHeaderOpen);
    localStorage.setItem("isMenuOpen", !isHeaderOpen);
  };

  console.log(isHeaderOpen);

  return (
    <>
      <header
        className={
          pathname === "/"
            ? "hidden"
            : { isHeaderOpen }
            ? "navigation_header menuOpen"
            : "navigation_header menuClose"
        }
      >
        <nav>
          <Link to="/">
          <img src="CovITLogo-Full_White.png" alt="Logo CovIT" className="laptopAndDesktop-hidden"/>
            {!isHeaderOpen ? (
              <img src="CovITLogo-White.png" alt="Logo CovIT" className="img-headerClose mobilAndTablet-hidden"/>
            ) : (
              <img src="CovITLogo-Full_White.png" alt="Logo CovIT" className="img-headerOpen mobilAndTablet-hidden"/>
            )}
          </Link>
          <NavLink to="/statistiques">
            <div className="nav-tab">
              <div className="nav-icon">
                <FontAwesomeIcon icon={faChartPie} />
              </div>
              <p
                className={`nav-text ${
                  !isHeaderOpen ? "nav-text-hidden" : "nav-text-visible"
                }`}
              >
                Stats
              </p>
            </div>
          </NavLink>
          <NavLink to="/ajouter_des_donnees">
            <div className="nav-tab">
              <div className="nav-icon">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
              <p
                className={`nav-text ${
                  !isHeaderOpen ? "nav-text-hidden" : "nav-text-visible"
                }`}
              >
                Add data
              </p>
            </div>
          </NavLink>

          <NavLink to="/connexion">
            <div className="nav-tab">
              <div className="nav-icon">
                <FontAwesomeIcon icon={faChalkboardUser} />
              </div>
              <p
                className={`nav-text ${
                  !isHeaderOpen ? "nav-text-hidden" : "nav-text-visible"
                }`}
              >
                Tableau de bord
              </p>
            </div>
          </NavLink>
        </nav>

        <div className="icon-toggle_menu">
          {isHeaderOpen ? (
            <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={handleMenu} />
          ) : (
            <FontAwesomeIcon icon={faAngleDoubleRight} onClick={handleMenu} />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
