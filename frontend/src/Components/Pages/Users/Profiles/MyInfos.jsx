import { useState, useEffect } from "react";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";

import UpdateInfos from "./UpdateMyInfos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CovItLogo from '../../../../Assets/Images/CovITLogoSolo.png';

function MyInfos() {
  const [user, setUser] = useState(null);
  const [editIsActiv, setEditIsActiv] = useState(false);
  const toggleEditIsActiv = () => {
    setEditIsActiv((preveditIsActiv) => !preveditIsActiv);
  };

  /**
   * Fetch user informations
   * @returns {Promise<void>}
   */
  useEffect(() => {
    async function getUserInfos() {
    const TOKEN = getItemWithExpiration("auth");
      try {
        const response = await fetch(`${API_BASE_URL}users/profil`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
          },
        });
        const data = await response.json();
        setUser(data.user);
        console.log('data', data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          error
        );
      }
    }
    getUserInfos();
  }, []);

  return (
    <>
      <h3>Vos informations</h3>

      {!user ? (
        <></>
      ) : (
        <>
          <div className="informations">
            <p className="informations-CovIT">CovIT</p>
            <p className="informations-position">Analiste</p>
            <p className="informations-name">
              {user.username}
            </p>
            <img src={CovItLogo} alt="logo" className="informations-logo" />

            <button
              className="informations-btn"
              type="button"
              onClick={toggleEditIsActiv}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="xl"
                className="icon"
              />
            </button>
          </div>
        </>
      )}

      {!editIsActiv ? (
        <></>
      ) : (
        <>{!user ? <></> : <UpdateInfos user={user} />}</>
      )}
    </>
  );
}

export default MyInfos;
