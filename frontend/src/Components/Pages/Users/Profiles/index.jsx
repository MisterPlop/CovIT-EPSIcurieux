import { useEffect, useState } from "react";

import MyInfos from "./MyInfos";
import AdminPanel from "./AdminPanel";

import { getItemWithExpiration } from "../../../../Assets/Variables/functions";
import { API_BASE_URL } from "../../../../Assets/Variables/const";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export default function UserAccount() {
  const [user, setUser] = useState([]);
  const [selectedTab, setSelectedTab] = useState("AdminPanel");

  const TOKEN = getItemWithExpiration("auth");

  /**
   * Fetch user informations
   * @returns {Promise<void>}
   */
  useEffect(() => {
    async function getUserInfos() {
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

  /**
   * Render the component according to the selected tab
   * @returns {JSX.Element}
   */
  const renderComponent = () => {
    switch (selectedTab) {
      case "MyInfos":
        return <MyInfos />;
      case "AdminPanel":
        return <AdminPanel />;
      default:
        return <h3>Sélectionnez une section</h3>;
    }
  };

  return (
    <>
      <section className="section-body">
        <h2>Bienvenue {user.username}</h2>
        <div className="user_account-nav">
          <button onClick={() => setSelectedTab("MyInfos")}>
          <FontAwesomeIcon icon={faInfo}  size="xl" />
          </button>
          {user && user.profil === "admin" && (
          <button onClick={() => setSelectedTab("AdminPanel")} className="admin-icon">
          <FontAwesomeIcon icon={faUserTie} size="xl"/>
          </button>
          )}
        </div>
        <article className="user_account">{renderComponent()}</article>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}