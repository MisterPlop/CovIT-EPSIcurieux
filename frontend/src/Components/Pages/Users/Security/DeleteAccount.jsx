// import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getItemWithExpiration } from "../../../../Assets/Variables/functions";

// import { signout } from "../../../../store/slices/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

function DeleteAccount() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const TOKEN = getItemWithExpiration("auth");
  // const { info } = useSelector((state) => state.user);
  // const [id, setId] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setMsg("Suppression non fonctionnelle pour le moment");
    /* const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre profil ?"
    );
    if (confirmed) {
      const res = await fetch(FETCH_URL + "users/delete/" + info.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ id: info.id }),
      });
      const json = await res.json();
      setMsg(json.msg);

      if (res.status === 201) {
        localStorage.removeItem("auth");
        // dispatch(signout(id));
        navigate(`/`);
      }
    } */
  }

  return (
    <>
      <h3>Supprimer votre compte</h3>

      <p className="informations-bio red">
        Attention cette action est irréversible.
      </p>

      <form onSubmit={handleSubmit}>
        {msg && <p className="red non-absolute">{msg}</p>}
        <button className="danger-btn dangerZone" type="submit">
          <FontAwesomeIcon icon={faUserXmark} size="lg" className="icon" />
        </button>
      </form>
    </>
  );
}

export default DeleteAccount;
