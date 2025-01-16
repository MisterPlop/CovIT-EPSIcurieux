import { useState } from "react";

import MyInfos from "./MyInfos";
import AccountSecurity from "../Security/Index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

export default function UserAccount() {
  const [selectedTab, setSelectedTab] = useState("");

  const renderComponent = () => {
    switch (selectedTab) {
      case "MyInfos":
        return <MyInfos />;
      case "AccountSecurity":
        return <AccountSecurity />;
      default:
        return <h3>Sélectionnez une section</h3>;
    }
  };

  return (
    <>
      <section className="section-body">
        <h2 className="user_account-title">Gestion de compte</h2>
        <div className="user_account-nav">
          <button onClick={() => setSelectedTab("MyInfos")}>
          <FontAwesomeIcon icon={faInfo}  size="xl" />
          </button>
          <button onClick={() => setSelectedTab("AccountSecurity")}>
          <FontAwesomeIcon icon={faShield}  size="xl" />
          </button>
        </div>
        <article className="user_account">{renderComponent()}</article>
      </section>
      <section className="section-end laptopAndDesktop-hidden"></section>
    </>
  );
}