import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getItemWithExpiration, setItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";

import { signin } from "../../../../store/slices/user";

export default function UpdateProfile({ user }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profil = user.profil;
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  const TOKEN = getItemWithExpiration("auth");

  /**
   * Update user informations
   * @returns {Promise<void>}
   * @param {string} username
   * @param {string} password
   * @param {string} profil
   * @param {number} id
   * 
   */
  async function handleSubmit(e) {
    e.preventDefault();
    try {

      if ( username === "" || password === "" || profil === "") {
        setMsg2("Veuillez remplir tous les champs");
      }
      if (user.id && username && password && profil) {

        const res = await fetch(`${API_BASE_URL}users/updateUserById?id=${encodeURIComponent(user.id)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ username, password, profil }),
        });
        const json = await res.json();
        console.log('json', json);
        console.log('res', res);

        if (res.status === 201) {
          setMsg(json.message);

          // If the user is updating his own profile, we need to update the token and the username in the store
          const loginRes = await fetch(API_BASE_URL + "users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          const loginJson = await loginRes.json();

          if (loginRes.status === 200) {
            setMsg(loginRes.message);
            setItemWithExpiration("auth", loginJson.token, 10080);
            dispatch(signin({ username: username }));
            navigate("/equipe/compte_utilisateur");
          }
        }
      } else {
        setMsg2("Veuillez remplir tous les champs");
      }

    } catch (error) {
      console.error("Erreur lors de la modification de vos informations: ", error);
      setMsg2("Une erreur est survenue, rechargez la page et réessayez");
    }
  }

  return (
    <>
      <h3>Modifier vos informations</h3>

      <div className="informations-update">
        <form onSubmit={handleSubmit} className="position-relative">
          <label htmlFor="profil">Type de profil</label>
          <input
            disabled
            placeholder="Type de profil"
            type="text"
            name="profil"
            value={user.profil === "admin" ? "Administrateur" : "Utilisateur"}
            title="Vous ne pouvez pas modifier votre type de profil"
          />
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {msg && <p className="msg green non-absolute">{msg}</p>}
          {msg2 && <p className="msg red non-absolute">{msg2}</p>}

          <button type="submit">Modifier</button>
        </form>
      </div>
    </>
  );
}
