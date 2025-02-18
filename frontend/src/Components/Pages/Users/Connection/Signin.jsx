import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getItemWithExpiration, setItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";
import { signin } from "../../../../store/slices/user";

export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    /**
     * Check if the user is already connected
     */
    const token = getItemWithExpiration("auth");
    useEffect(() => {
        if (!token) {
            return;
        } else {
            navigate("/statistiques");
        }
    }, []);

    /**
     * Sign in
     * @returns {Promise<void>}
     * @param {string} username
     * @param {string} password
     * Token is stored in the local storage
     * Username is stored in the store
     * If the user is connected, he is redirected to the manage datas page
     */
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(API_BASE_URL + "users/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const json = await res.json();

        if (res.status === 200) {
            setMsg(res.message);
            setItemWithExpiration("auth", json.token, 10080);
            dispatch(signin({ username: username }));
            navigate("/equipe/gestion_des_donnees");
        } else {
            setMsg2(res.message);
        }
    };

    return (
        <>
            <section className="section-body log-section">

                {msg && <p className="msg green">{msg}</p>}
                {msg2 && <p className="msg red">{msg2}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        required
                        placeholder="Votre nom d'utilisateur"
                        type="text"
                        name="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" >Se connecter</button>
                </form>
            </section>
        </>
    );
}