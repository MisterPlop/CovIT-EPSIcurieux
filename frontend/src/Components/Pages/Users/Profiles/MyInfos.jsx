import { useState, useEffect } from "react";

// import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

import UpdateInfos from "./UpdateMyInfos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MyInfos() {
  const [user, setUser] = useState(null);
  const [editIsActiv, setEditIsActiv] = useState(false);
  const toggleEditIsActiv = () => {
    setEditIsActiv((preveditIsActiv) => !preveditIsActiv);
  };

  useEffect(() => {
    async function getUserInfos() {
      try {
        const response = await fetch("/users.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const users = await response.json();
          const user = users.find((u) => u.id === 1);
          setUser(user);
        } else {
          console.error(
            "Erreur lors de la récupération des informations utilisateur:",
            response.statusText
          );
        }
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
              <p className="informations-position">{user.position}</p>
              <p className="informations-name">
                {user.firstname} {user.lastname}
              </p>
              <p className="informations-email">{user.email}</p>

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
