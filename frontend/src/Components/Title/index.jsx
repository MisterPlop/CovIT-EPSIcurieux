import React, { useState } from "react";
import {
  faCircleUser,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import ProfilPic from "../../Assets/Images/profilePicUser2.png";

import { getItemWithExpiration } from "../../Assets/Variables/functions";

export default function Title({ title }) {
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const TOKEN = getItemWithExpiration('auth');

  const toggleLoginMenu = () => {
    if (loginMenuOpen) {
      setClosing(true);
      setTimeout(() => {
        setLoginMenuOpen(false);
        setClosing(false);
      }, 700); // Duration of the animation
    } else {
      setLoginMenuOpen(true);
    }
  };

  return (
    <section className={!title ? "hidden" : "section-title"}>
      <h4>{title}</h4>

      <div className="login-menu">
        {!TOKEN ? (
          <>
            <Link to="/equipe/connexion">
              <FontAwesomeIcon icon={faCircleUser} size="lg"/>
            </Link>
          </>
        ) : (
          <>
            <img
              src={ProfilPic}
              alt="Avatar"
              className={`avatar ${loginMenuOpen ? "avatar-open" : ""} ${
                closing ? "avatar-close" : ""
              }`}
              onClick={toggleLoginMenu}
            />

              <Link to="/equipe/deconnexion" className="logout">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Link>
          </>
        )}
      </div>
    </section>
  );
}
