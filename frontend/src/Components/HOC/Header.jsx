import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import { getItemWithExpiration } from "../../Assets/Variables/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faFilePen,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

import CovITLogoSolo from "../../Assets/Images/CovITLogoSolo.png";
import CovITLogoSoloTextWhite from "../../Assets/Images/CovITLogo-Text_White.png";

function Header() {
  const { pathname } = useLocation();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const handleMenu = () => {
    setIsHeaderOpen((prevIsHeaderOpen) => !prevIsHeaderOpen);
    localStorage.setItem("isMenuOpen", !isHeaderOpen);
  };

  const FAKETOKEN = getItemWithExpiration("fakeauth");

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
            <img
              src={CovITLogoSolo}
              alt="Logo CovIT"
              className="laptopAndDesktop-hidden"
            />
            {!isHeaderOpen ? (
              <img
                src={CovITLogoSolo}
                alt="Logo CovIT"
                className="img-headerClose mobilAndTablet-hidden"
              />
            ) : (
              <img
                src={CovITLogoSoloTextWhite}
                alt="Logo CovIT"
                className="img-headerOpen mobilAndTablet-hidden"
              />
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
                Observer
              </p>
            </div>
          </NavLink>

          {FAKETOKEN && (
            <>
              <NavLink to="/ajouter_des_donnees">
                <div className="nav-tab">
                  <div className="nav-icon">
                    <FontAwesomeIcon icon={faFilePen} />
                  </div>
                  <p
                    className={`nav-text ${
                      !isHeaderOpen ? "nav-text-hidden" : "nav-text-visible"
                    }`}
                  >
                    Gérer
                  </p>
                </div>
              </NavLink>

              <NavLink to="/profil">
                <div className="nav-tab">
                  <div className="nav-icon">
                    <FontAwesomeIcon icon={faAddressCard} />
                  </div>
                  <p
                    className={`nav-text ${
                      !isHeaderOpen ? "nav-text-hidden" : "nav-text-visible"
                    }`}
                  >
                    Profil
                  </p>
                </div>
              </NavLink>
            </>
          )}
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
