import { useState } from "react";

import UpdateSecurity from "./UpdateSecurity";
import DeleteAccount from "./DeleteAccount";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserXmark  } from "@fortawesome/free-solid-svg-icons";

function AccountSecurity() {
    
  const [editIsActiv, setEditIsActiv] = useState(false);
  const toggleEditIsActiv = () => {
    setEditIsActiv((preveditIsActiv) => !preveditIsActiv);
    setDeleteIsActiv(false);
  };

  const [deleteIsActiv, setDeleteIsActiv] = useState(false);
  const toggleDeleteIsActiv = () => {
    setEditIsActiv(false);
    setDeleteIsActiv((prevdeleteIsActiv) => !prevdeleteIsActiv);
  };

  return (
    <>
      <h3>Espace sensible</h3>

      <p className="informations-bio">
        Attention ici vous pouvez modifier votre mot de passe ou supprimer votre
        profil.
      </p>

        <button
          className="security-btn"
          type="button"
          onClick={toggleEditIsActiv}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="xl" className="icon" />
        </button>
        <button
          className="security-btn dangerZone"
          type="button"
          onClick={toggleDeleteIsActiv}
        >
          <FontAwesomeIcon icon={faUserXmark} size="lg" className="icon" />
        </button>

      {!editIsActiv ? <></> : <UpdateSecurity />}
      {!deleteIsActiv ? <></> : <DeleteAccount />}
    </>
  );
}

export default AccountSecurity;
