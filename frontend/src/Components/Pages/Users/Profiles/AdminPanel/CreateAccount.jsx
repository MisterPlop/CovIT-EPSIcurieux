import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getItemWithExpiration } from "../../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../../Assets/Variables/const";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreateAccount() {

    const navigate = useNavigate();
    const TOKEN = getItemWithExpiration("auth");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profil, setProfil] = useState("");

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password || !profil) {
            setMsg2("Veuillez remplir tous les champs");
            return;
        }

        const res = await fetch(API_BASE_URL + "users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify({ username, password, profil }),
        });
        const json = await res.json();

        if (res.status === 201) {
            setMsg(json.message);
            navigate("/equipe/compte_utilisateur");
        } else {
            setMsg2(json.message);
        }
    }

    return (
        <>
            <section className="section-body log-section">

                <Link to="/equipe/compte_utilisateur" className="back-link"><FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '10px' }} size="xs"/>Retour</Link>

                {msg && <p className="msg green">{msg}</p>}
                {msg2 && <p className="msg red">{msg2}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        placeholder="Nom d'utilisateur"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="profil">Type de profil</label>
                    <select name="profil" onChange={(e) => setProfil(e.target.value)}>
                        <option value="">Choisir un profil</option>
                        <option value="admin">Administrateur</option>
                        <option value="pasadmin">Utilisateur</option>
                    </select>
                    <button type="submit">Créer le compte</button>
                </form>
            </section>
        </>
    );
}