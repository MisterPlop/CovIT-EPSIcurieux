import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { setItemWithExpiration } from "../../../../Assets/Variables/functions";

function Form({ type }) {
  const navigate = useNavigate();

  // const newUserId = uuidv4().slice(0, 16); // à chaque chargement du composant une chaine de 16 caractères aléatoire sera stocké // SIGNUP

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  /*   const [msg2, setMsg2] = useState("");
  const [msg3, setMsg3] = useState(""); */

  const FAKETOKEN = getItemWithExpiration("fakeauth");
  useEffect(() => {
    if (!FAKETOKEN) {
      return;
    } else {
      navigate("/");
    }
  }, [FAKETOKEN, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (type === "in") {
      setMsg("Connexion démo");
      setItemWithExpiration("fakeauth", "juste pour la démo", 10080);
      navigate("/");
    }
    if (type === "up") {
      setMsg(
        "Application non connecté à une base de données, pas de compte créé"
      );
    }
  }

  return (
    <>
      <section className="section-body log-section">
        {type === "in" ? (
          <>
            {msg && <p className="msg red">{msg}</p>}
            {/* {msg2 && <p className="msg green">{msg2}</p>} */}
          </>
        ) : (
          <>
            {msg && <p className="msg red">{msg}</p>}
            {/* {msg2 && <p className="msg green">{msg2}</p>}
            {msg3 && (
              <p className="msg yellow">
                <Link to="/utilisateurs/connexion" className="msg_yellow">
                  {msg3}
                </Link>
              </p>
            )} */}
          </>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Adresse Mail</label>
          <input
            required
            placeholder="Votre email"
            type="email" // vérification du format de l'entrée de l'utilisateur côté server
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            required
            placeholder="Votre mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={type === "in" ? "" : "gold"}>
            {type === "in" ? "Se connecter" : "S'enregistrer"}
          </button>
        </form>

        <div className="form-footer">
          {type === "in" && (
            <>
              <p>Pas encore de compte ?</p>
              <p>
                Vous pouvez{" "}
                <Link to="/utilisateurs/creer-un-compte">
                  <span className="overline">en créer un</span>.
                </Link>
              </p>
            </>
          )}
          {type === "up" && (
            <>
              <p>Vous avez déjà un compte ?</p>
              <p>
                Connectez vous{" "}
                <Link to="/utilisateurs/connexion">
                  <span className="gold overline">ici</span>.
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Form;
